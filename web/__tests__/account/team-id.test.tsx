import { screen, waitFor } from '@testing-library/react'
import TeamMemberPage from '@/pages/account/your-team/member'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe, mockTeam } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'

const data = mockTeam[0]
const mockRouter = jest.fn(() => ({ query: { id: data.id } }))

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => mockRouter()
}))

describe('Page: Team member with ID', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  beforeEach(() => {
    fetchMock.mockResponses(
      [JSON.stringify(mockMe), { status: 200 }],
      [JSON.stringify(mockTeam), { status: 200 }]
    )
  })

  it('renders with skill tabs', async () => {
    renderWithProviders(<TeamMemberPage />)
    await waitFor(async () => {
      expect(screen.getByText(data.skills[0].name)).toBeInTheDocument()
    })
    expect(screen.getByText(data.skills[0].name)).toBeInTheDocument()
    expect(screen.getByText(data.skills[1].name)).toBeInTheDocument()
    expect(screen.getByText(data.skills[2].name)).toBeInTheDocument()

    expect(screen.getByTestId('tab-0')).toBeInTheDocument()
    expect(screen.getByTestId('tab-1')).toBeInTheDocument()
    expect(screen.getByTestId('tab-2')).toBeInTheDocument()
  })

  it('pending skill', async () => {
    renderWithProviders(<TeamMemberPage />)

    await waitFor(async () => {
      expect(screen.getByTestId('status-pending')).toHaveTextContent(data.skills[2].name)
    })
  })

  it('profile tab', async () => {
    const data = mockTeam[1]

    mockRouter.mockImplementation(() => ({ query: { id: data.id } }))
    fetchMock.mockResponses(
      [JSON.stringify(mockMe), { status: 200 }],
      [JSON.stringify(mockTeam), { status: 200 }]
    )

    renderWithProviders(<TeamMemberPage />)

    await waitFor(async () => {
      expect(screen.getByTestId('tab-2')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByTestId('tab-2'))

    await waitFor(async () => {
      expect(screen.getByText(data.job_title)).toBeInTheDocument()
    })
    expect(screen.getByText(data.business_unit)).toBeInTheDocument()
    expect(screen.getByText(data.location)).toBeInTheDocument()
    expect(screen.getByText(data.primary_profession)).toBeInTheDocument()
  })
})
