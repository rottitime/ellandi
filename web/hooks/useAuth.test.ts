import { mockMe, renderHookWithProviders } from '@/lib/test-utils'
import { AuthUser } from '@/service/types'
import { waitFor } from '@testing-library/react'
import useAuth from './useAuth'
import { sendVerificationEmail } from '@/service/auth'

jest.mock('@/service/auth', () => ({
  ...jest.requireActual('@/service/auth'),
  sendVerificationEmail: jest.fn()
}))

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

      const { result } = renderHookWithProviders(() => useAuth())

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

      const { result } = renderHookWithProviders(() => useAuth())

      expect(result.current.login(loginData)).rejects.toThrow('custom server error')
    })
  })

  it('createAndLogin', async () => {
    sessionStorage.setItem('token', '123')
    const response = { expiry: '1', token: '1' }
    fetchMock.mockResponses(
      [JSON.stringify(mockMe), { status: 200 }],
      [JSON.stringify(response), { status: 200 }]
    )
    const { result } = renderHookWithProviders(() => useAuth())
    const userData = await result.current.createAndLogin({
      email: 'string',
      password: 'string'
    })

    await waitFor(() => expect(sendVerificationEmail).toHaveBeenCalled())
    expect(userData).toEqual(expect.objectContaining(mockMe))
  })

  describe('logout', () => {
    it('removes session', async () => {
      const token = '123'
      sessionStorage.setItem('token', token)

      const { result } = renderHookWithProviders(() => useAuth())

      expect(sessionStorage.getItem('token')).toEqual(token)

      await result.current.logout()

      await waitFor(() => {
        expect(sessionStorage.getItem('token')).toBeFalsy()
      })
    })
  })
})
