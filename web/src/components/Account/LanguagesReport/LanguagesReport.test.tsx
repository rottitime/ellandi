import LanguagesReport from './LanguagesReport'
import fetchMock from 'jest-fetch-mock'
import {
  within,
  screen,
  waitFor,
  renderWithProviders,
  mockReportLanguages
} from '@/lib/test-utils'

describe('LanguagesReport', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders with data after loading', async () => {
    fetchMock.mockResponse(JSON.stringify(mockReportLanguages), { status: 200 })
    renderWithProviders(<LanguagesReport />)

    await waitFor(async () => {
      expect(
        within(screen.getByRole('grid')).getByText(mockReportLanguages.data[5].name)
      ).toBeInTheDocument()
    })

    for (let i = 1; i < 5; i++) {
      expect(
        within(screen.getByRole('grid')).getByText(mockReportLanguages.data[i].name)
      ).toBeInTheDocument()
    }

    expect(
      within(screen.getByRole('grid')).queryByText(mockReportLanguages.data[0].name)
    ).not.toBeInTheDocument()
  })
})
