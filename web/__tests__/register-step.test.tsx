import RegisterStepPage from '@/pages/register/step/[step]'
import fetchMock from 'jest-fetch-mock'
import {
  screen,
  waitFor,
  bugfixForTimeout,
  mockMe,
  renderWithProviders
} from '@/lib/test-utils'

jest.mock('@/components/Form/Register/RegisterDetailsForm/RegisterDetailsForm', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(() => <>mock-form</>)
}))

const mockReplace = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter() {
    return {
      replace: mockReplace
    }
  }
}))

describe('Page: Registration steps', () => {
  afterEach(() => {
    fetchMock.resetMocks()
    jest.resetAllMocks()
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
    await bugfixForTimeout()

    await waitFor(async () => expect(mockReplace).not.toHaveBeenCalled())
    expect(screen.getByText('mock-form')).toBeInTheDocument()
  })

  it('invalid user, redirects back to signup', async () => {
    fetchMock.mockResponses([JSON.stringify(mockMe), { status: 200 }])

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
      expect(mockReplace).toHaveBeenCalledWith({
        pathname: '/register',
        query: { ecode: 1 }
      })
    })
  })
})
