import YourTeamPage from '@/pages/account/your-team'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe, screen, waitFor, mockTeam } from '@/lib/test-utils'

describe('Page: Your Team', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('Pending skills', () => {
    beforeEach(() => {
      fetchMock.mockResponses(
        // [JSON.stringify(mockMe), { status: 200 }],
        [JSON.stringify(mockTeam), { status: 200 }]
      )
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
  })

  //   expect(
  //     screen.getByText(`${mockMe.first_name} ${mockMe.last_name}`)
  //   ).toBeInTheDocument()

  //   expect(screen.getByText(mockMe.job_title)).toBeInTheDocument()
  //   expect(screen.getByText(mockMe.business_unit)).toBeInTheDocument()
  //   expect(screen.getByText(mockMe.business_unit)).toBeInTheDocument()
  //   expect(screen.getByText(mockMe.line_manager_email)).toBeInTheDocument()
  //   expect(screen.getByText(mockMe.line_manager_email)).toBeInTheDocument()
  //   expect(screen.getByText(mockMe.grade)).toBeInTheDocument()
  //   expect(screen.getByText(mockMe.function)).toBeInTheDocument()
  //   expect(screen.getByText(mockMe.contract_type)).toBeInTheDocument()
  //   expect(screen.getByText('Audit, Management')).toBeInTheDocument()
  // })
})
