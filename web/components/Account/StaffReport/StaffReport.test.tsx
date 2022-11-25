import StaffReport from './StaffReport'
import fetchMock from 'jest-fetch-mock'
import {
  within,
  screen,
  waitFor,
  mockReportSkills,
  mockSkills,
  renderWithProviders
} from '@/lib/test-utils'
import { MeReporGrade, MeReporResponsibility } from '@/service/types'

const mockResonsibilities: MeReporResponsibility = {
  data: [
    {
      name: 'Group1',
      total_label: '8 (4%)',
      total_value_total: 8,
      total_value_percentage: 4
    },
    {
      name: 'Group 2 users',
      total_label: '7 (3%)',
      total_value_total: 7,
      total_value_percentage: 3
    },
    {
      name: 'Total users',
      total_label: '205',
      total_value_total: 205,
      total_value_percentage: 100
    }
  ]
}

const mockGrades: MeReporGrade = {
  data: [...Array(5).keys()].map((i) => ({
    name: `Grade title ${i}`,
    total_label: `${i} (${i}%)`,
    total_value_total: i,
    total_value_percentage: i
  }))
}

describe('StaffReport', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockResonsibilities), { status: 200 }],
      [JSON.stringify(mockGrades), { status: 200 }]
    )
    renderWithProviders(<StaffReport />)

    await waitFor(async () => {
      expect(
        within(screen.getByTestId('responsibilities')).getByText(
          mockResonsibilities.data[0].name
        )
      ).toBeInTheDocument()
    })

    expect(
      within(screen.getByTestId('responsibilities')).getByText(
        mockResonsibilities.data[1].name
      )
    ).toBeInTheDocument()

    expect(
      within(screen.getByTestId('responsibilities')).getByText(
        mockResonsibilities.data[2].name
      )
    ).toBeInTheDocument()

    mockGrades.data.forEach((grade) => {
      expect(screen.getByText(grade.name)).toBeInTheDocument()
    })
  })
})
