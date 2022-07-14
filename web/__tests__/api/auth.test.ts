import { loginWithEmailAndPassword } from '@/service/user'
import fetchMock from 'jest-fetch-mock'

const mockData = { email: 'test@test.com', password: 'test' },
  mockSuccess = {
    expiry: 'date',
    token: '111'
  },
  mockError = {
    detail: 'error message from server'
  }

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
    fetchMock.mockResponseOnce(JSON.stringify('broken and unknown'), { status: 400 })

    expect(loginWithEmailAndPassword(mockData)).rejects.toThrow('Service unavailable')
  })
})
