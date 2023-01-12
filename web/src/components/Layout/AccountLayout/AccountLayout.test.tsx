import AccountLayout from './AccountLayout'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, screen, waitFor, mockMe } from '@/lib/test-utils'

const pushSpy = jest.fn()
const replaceSpy = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    locale: 'en',
    push: pushSpy,
    replace: replaceSpy
  }))
}))

describe('AccountLayout', () => {
  afterEach(() => {
    fetchMock.resetMocks()
    pushSpy.mockReset()
  })

  it('renders', async () => {
    fetchMock.mockResponse(JSON.stringify(mockMe), { status: 200 })
    renderWithProviders(
      <AccountLayout>
        <p>my page</p>
      </AccountLayout>
    )

    await waitFor(async () => {
      expect(screen.getByText('my page')).toBeInTheDocument()
    })
  })

  it('email verification checks', async () => {
    fetchMock.mockResponse(JSON.stringify({ ...mockMe, verified: false }), {
      status: 200
    })
    await renderWithProviders(
      <AccountLayout>
        <p>my page</p>
      </AccountLayout>
    )
    await waitFor(async () =>
      expect(replaceSpy).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: 'email-confirm' })
      )
    )
  })

  describe('API Errors', () => {
    const redirectParams = {
      pathname: 'signin',
      query: { ecode: 3 }
    }

    it('unauthenticated user', async () => {
      fetchMock.mockResponse(JSON.stringify(mockMe), { status: 401 })

      await renderWithProviders(
        <AccountLayout>
          <p>my page</p>
        </AccountLayout>
      )

      await waitFor(async () =>
        expect(replaceSpy).toHaveBeenCalledWith(expect.objectContaining(redirectParams))
      )
    })

    it('renders page on bad request', async () => {
      fetchMock.mockResponse(JSON.stringify(mockMe), {
        status: 400
      })

      await renderWithProviders(
        <AccountLayout>
          <p>my page</p>
        </AccountLayout>
      )

      await waitFor(async () =>
        expect(replaceSpy).toHaveBeenCalledWith(expect.objectContaining(redirectParams))
      )
    })
  })
})
