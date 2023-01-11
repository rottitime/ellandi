import { createUser, loginWithEmailAndPassword } from '@/service/auth'
import fetchMock from 'jest-fetch-mock'

const mockData = { email: 'test@test.com', password: 'test' },
  mockSuccess = {
    expiry: 'date',
    token: '111'
  },
  mockError = {
    detail: 'error message from server'
  }

describe('Service: user', () => {
  describe('loginWithEmailAndPassword', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })

    it('Success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockSuccess), { status: 200 })

      const res = await loginWithEmailAndPassword(mockData)
      expect(res).toMatchObject(mockSuccess)
    })

    it('Error returned with detail from server', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockError), { status: 400 })

      expect(loginWithEmailAndPassword(mockData)).rejects.toThrow(mockError.detail)
    })

    it('Error returned with default message', async () => {
      try {
        await loginWithEmailAndPassword(mockData)
      } catch (err) {
        expect(err).toEqual(
          new Error('Sorry, there is a problem with the service. Try again later.')
        )
      }
    })

    it('converts email to lowercase', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockSuccess), { status: 200 })

      loginWithEmailAndPassword({
        ...mockData,
        email: 'CapItaL@TeST.cOM'
      })

      const lastFetchCall = JSON.parse(fetchMock.mock.calls[0][1].body as string)

      expect(lastFetchCall.email).toEqual('capital@test.com')
    })
  })

  describe('createUser', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })

    it('converts email to lowercase', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockSuccess), { status: 200 })

      createUser({
        ...mockData,
        email: 'CapItaL@TeST.cOM'
      })

      const lastFetchCall = JSON.parse(fetchMock.mock.calls[0][1].body as string)

      expect(lastFetchCall.email).toEqual('capital@test.com')
    })
  })
})
