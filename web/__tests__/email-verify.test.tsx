import { screen, waitFor } from '@testing-library/react'
import EmailVerifyPage from '@/pages/signin/verify'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, bugfixForTimeout } from '@/lib/test-utils'

const mockRouter = jest.fn(() => ({ query: { code: 'mycode', user_id: 'abc123' } }))

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => mockRouter()
}))

describe('Page: Email Vrrify page', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('loading state', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200
    })
    renderWithProviders(<EmailVerifyPage />)

    await bugfixForTimeout()
    expect(screen.getByTestId('page-loading')).toBeInTheDocument()
  })

  it('success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200
    })
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(screen.getByTestId('page-success')).toBeInTheDocument()
    })
  })

  it('shows server error', async () => {
    const error = 'message from server'
    const errorMessage = `Error: ${error}`
    fetchMock.mockResponseOnce(JSON.stringify({ detail: error }), {
      status: 400
    })
    renderWithProviders(<EmailVerifyPage />)

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(() => {
        screen.getByText(errorMessage)
      }).toThrow(errorMessage)
    })
  })

  it('shows default error', async () => {
    const error = 'Error: Sorry, there is a problem with the service. Try again later.'
    fetchMock.mockResponseOnce(JSON.stringify('broken message'), {
      status: 400
    })
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(() => {
        screen.getByText(error)
      }).toThrow(error)
    })
  })
})
