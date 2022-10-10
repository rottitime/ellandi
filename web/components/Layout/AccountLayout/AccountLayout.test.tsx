import AccountLayout from './AccountLayout'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, screen, waitFor, mockMe } from '@/lib/test-utils'
import router from 'next/router'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  replace: jest.fn()
}))

describe('AccountLayout', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    fetchMock.resetMocks()
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

  describe('API Errors', () => {
    const redirectParams = {
      pathname: 'signin',
      query: { ecode: 3 }
    }

    it('unuathenticated user', async () => {
      fetchMock.mockResponse(JSON.stringify(mockMe), { status: 401 })

      await renderWithProviders(
        <AccountLayout>
          <p>my page</p>
        </AccountLayout>
      )

      await waitFor(async () =>
        expect(router.replace).toHaveBeenCalledWith(redirectParams)
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
        expect(router.replace).toHaveBeenCalledWith(redirectParams)
      )
    })
  })
})
