import { fetchMe } from '@/service/me'
import { mockMe } from '@/lib/test-utils'
import fetchMock from 'jest-fetch-mock'

describe('Service: me', () => {
  describe('fetchMe', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })

    it('Success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockMe), { status: 200 })

      const res = await fetchMe('my-token')
      expect(res).toMatchObject(mockMe)
    })

    it('adds a fullname', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockMe), { status: 200 })

      const res = await fetchMe('my-token')
      expect(res.fullname).toEqual('James Bond')
    })

    it('empty data', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 })
      const res = await fetchMe('my-token')
      expect(res).toEqual({})
    })
  })
})
