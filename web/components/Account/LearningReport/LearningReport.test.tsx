import LearningReport from './LearningReport'
import fetchMock from 'jest-fetch-mock'
import { screen, waitFor, renderWithProviders } from '@/lib/test-utils'
import { MeReporLearning } from '@/service/types'

const mockResonsibilities: MeReporLearning = {
  course_average_cost_label: '£112',
  course_total_cost_label: '£201',
  course_average_cost_value: 100,
  course_total_cost_value: 201,
  goal_value_days: 0,
  goal_value_percentage: 1,
  distribution: [
    {
      name: 'Formal',
      value_percentage: 79
    },
    {
      name: 'Social',
      value_percentage: 11
    },
    {
      name: 'On the job',
      value_percentage: 11
    }
  ]
}

describe('LearningReport', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponse(JSON.stringify(mockResonsibilities), { status: 200 })
    renderWithProviders(<LearningReport />)

    await waitFor(async () => {
      expect(screen.getByTestId('average-cost')).toHaveTextContent(
        mockResonsibilities.course_average_cost_label
      )
    })

    expect(screen.getByTestId('total-cost')).toHaveTextContent(
      mockResonsibilities.course_total_cost_label
    )
  })
})
