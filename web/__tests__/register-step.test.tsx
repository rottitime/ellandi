import RegisterStepPage from '@/pages/register/step/[step]'
import fetchMock from 'jest-fetch-mock'
import { screen, waitFor, mockMe, renderWithProviders } from '@/lib/test-utils'

const replaceSpy = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    locale: 'en',
    replace: replaceSpy
  }))
}))

describe('Page: Registration steps', () => {
  afterEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
  })

  it('valid user with token', async () => {
    sessionStorage.setItem('token', 'my-token')
    fetchMock.mockResponse(JSON.stringify(mockMe), { status: 200 })

    renderWithProviders(
      <RegisterStepPage
        stepInt={0}
        nextUrl=""
        title="test"
        backUrl=""
        progress={0}
        skip={true}
      />
    )

    await waitFor(async () => expect(replaceSpy).not.toHaveBeenCalled())
    expect(screen.getByTestId('register-step-0')).toBeInTheDocument()
  })

  it('invalid user, no token', async () => {
    fetchMock.mockResponse(JSON.stringify(mockMe), { status: 200 })

    renderWithProviders(
      <RegisterStepPage
        stepInt={0}
        nextUrl=""
        title="test"
        backUrl=""
        progress={0}
        skip={true}
      />
    )

    await waitFor(async () => {
      expect(replaceSpy).toHaveBeenCalledWith({
        pathname: '/register',
        query: { ecode: 1 }
      })
    })
  })

  it('invalid token', async () => {
    sessionStorage.setItem('token', 'my-token')
    fetchMock.mockResponse(JSON.stringify({ detail: 'I have no idea who you are' }), {
      status: 401
    })

    renderWithProviders(
      <RegisterStepPage
        stepInt={0}
        nextUrl=""
        title="test"
        backUrl=""
        progress={0}
        skip={true}
      />
    )

    await waitFor(async () => {
      expect(replaceSpy).toHaveBeenCalledWith({
        pathname: '/register',
        query: { ecode: 1 }
      })
    })
  })
})
