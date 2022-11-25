import SkillsReport from './SkillsReport'
import fetchMock from 'jest-fetch-mock'
import {
  within,
  screen,
  waitFor,
  mockReportSkills,
  mockSkills,
  renderWithProviders
} from '@/lib/test-utils'

describe('SkillsReport', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders with data after loading', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockSkills), { status: 200 }],
      [JSON.stringify(mockReportSkills), { status: 200 }]
    )
    renderWithProviders(<SkillsReport />)

    await waitFor(async () => {
      expect(
        within(screen.getByRole('grid')).getByText(mockSkills[0])
      ).toBeInTheDocument()
    })

    expect(within(screen.getByRole('grid')).getByText(mockSkills[1])).toBeInTheDocument()
    expect(within(screen.getByRole('grid')).getByText(mockSkills[2])).toBeInTheDocument()
  })
})
