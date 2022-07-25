import { AuthUser } from '@/service/types'
import { renderHook, waitFor } from '@testing-library/react'
import useAuth from './useAuth'

describe('Hook: useAuth', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('login', () => {
    const loginData = { email: '1@test.com', password: 'abc123' }

    it('success and sets session', async () => {
      const token: AuthUser = { expiry: '1', token: 'token123' }
      fetchMock.mockResponseOnce(JSON.stringify(token), {
        status: 200
      })

      const { result } = renderHook(() => useAuth())

      const res = await result.current.login(loginData)

      await waitFor(() => {
        expect(sessionStorage.getItem('token')).toEqual('token123')
      })

      expect(res).toEqual(token)
    })

    it('errors', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ detail: 'custom server error' }), {
        status: 400
      })

      const { result } = renderHook(() => useAuth())

      expect(result.current.login(loginData)).rejects.toThrow('custom server error')
    })
  })

  describe('login', () => {
    describe('logout', () => {
      it('removes session', async () => {
        const token = '123'
        sessionStorage.setItem('token', token)
        const { result } = renderHook(() => useAuth())

        expect(sessionStorage.getItem('token')).toEqual(token)

        await result.current.logout()

        await waitFor(() => {
          expect(sessionStorage.getItem('token')).toBeFalsy()
        })
      })
    })
  })
})
