import YourTeamPage from '@/pages/account/your-team'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, screen, waitFor, mockTeam } from '@/lib/test-utils'

describe('Page: Your Team', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify(mockTeam), { status: 200 })
  })

  it('renders', async () => {
    renderWithProviders(<YourTeamPage />)

    await waitFor(async () => {
      expect(
        screen.getByText(`${mockTeam[0].first_name} ${mockTeam[0].last_name}`)
      ).toBeInTheDocument()
    })

    expect(
      screen.getByText(`${mockTeam[1].first_name} ${mockTeam[1].last_name}`)
    ).toBeInTheDocument()
  })

  describe('Pending skills component', () => {
    it('shows', async () => {
      renderWithProviders(<YourTeamPage />)

      await waitFor(async () => {
        expect(screen.getByTestId('review-skills')).toBeInTheDocument()
      })
    })

    it('hidden', async () => {
      fetchMock.mockResponse(JSON.stringify([{ ...mockTeam[0], skills: [] }]), {
        status: 200
      })

      renderWithProviders(<YourTeamPage />)

      await waitFor(async () => {
        expect(
          screen.getByText(`${mockTeam[0].first_name} ${mockTeam[0].last_name}`)
        ).toBeInTheDocument()
      })

      expect(screen.queryByTestId('review-skills')).not.toBeInTheDocument()
    })
  })
})
