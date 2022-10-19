import { screen, waitFor } from '@testing-library/react'
import EmailVerifyPage from '@/pages/signin/email/verify'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe, mockAuthToken, mockSkills } from '@/lib/test-utils'
import router from 'next/router'

const mockRouter = jest.fn(() => ({ query: { code: 'mycode', user_id: 'user#1' } }))

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => mockRouter(),
  replace: jest.fn()
}))

describe('Page: Email Verify page', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('Success', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockAuthToken), { status: 200 }],
      [JSON.stringify({ ...mockMe, skills: mockSkills }), { status: 200 }]
    )
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(router.replace).toHaveBeenCalledWith('landingSignin')
    })
    expect(screen.getByTestId('page-loading')).toBeInTheDocument()
  })

  it('Incomplete profile', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockAuthToken), { status: 200 }],
      [JSON.stringify({ ...mockMe, first_name: null }), { status: 200 }]
    )
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(router.replace).toHaveBeenCalledWith('/register/step/0/')
    })
  })

  it('verification invalid', async () => {
    fetchMock.mockResponses([
      JSON.stringify({ detail: 'Invalid token' }),
      { status: 400 }
    ])
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(router.replace).toHaveBeenCalledWith({
        pathname: 'signin',
        query: { ecode: 4 }
      })
    })

    expect(screen.getByTestId('page-loading')).toBeInTheDocument()
    expect(screen.queryByTestId('page-error')).not.toBeInTheDocument()
  })

  it('all other errors', async () => {
    const detail = 'some random message from the server'
    fetchMock.mockResponseOnce(JSON.stringify({ detail }), {
      status: 400
    })
    renderWithProviders(<EmailVerifyPage />)

    await waitFor(async () => {
      expect(screen.getByTestId('page-error')).toBeInTheDocument()
    })

    expect(router.replace).not.toHaveBeenCalled()
    expect(screen.queryByTestId('page-loading')).not.toBeInTheDocument()
  })
})
