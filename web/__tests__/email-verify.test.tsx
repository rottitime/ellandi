import { screen, waitFor } from '@testing-library/react'
import EmailVerifyPage from '@/pages/signin/verify'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe } from '@/lib/test-utils'
import router from 'next/router'

const mockRouter = jest.fn(() => ({ query: { code: 'mycode', user_id: 'abc123' } }))

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => mockRouter(),
  replace: jest.fn()
}))

describe('Page: Email Verify page', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockMe), {
      status: 200
    })
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(screen.getByTestId('page-success')).toBeInTheDocument()
    })

    expect(router.replace).toHaveBeenCalledWith('signin')
  })

  it('shows server error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ detail: 'broken' }), {
      status: 400
    })
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(screen.getByTestId('page-error')).toBeInTheDocument()
    })

    expect(router.replace).toHaveBeenCalledWith({
      pathname: 'signin',
      query: { ecode: 4 }
    })
  })
})
