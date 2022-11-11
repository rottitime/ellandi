import { screen, waitFor } from '@testing-library/react'
import LearningGoalBar from './LearningGoalBar'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import { Props } from '@/components/UI/PercentageBar/types'
import { MeLearningRecord } from '@/service/types'

const mockData: MeLearningRecord = {
  distribution: [],
  goal_value_days: 0,
  goal_value_percentage: 0,
  data: [
    {
      id: '1',
      learning_type: 'Cateogory a',
      name: 'Kicking a football',
      duration_minutes: 0,
      date_completed: '2022-09-01',
      cost_pounds: null,
      cost_unknown: null
    }
  ]
}

jest.mock('@/components/UI/PercentageBar/PercentageBar', () => (props: Props) => (
  <div data-testid="percentage">{props?.data[0]?.percentage}</div>
))

describe('LearningGoalBar', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('renders', () => {
    it('no fill', async () => {
      fetchMock.mockResponse(JSON.stringify(mockData), { status: 200 })
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () => {
        expect(screen.getByTestId('stat')).toHaveTextContent('0 days (0%)')
      })
    })

    it('default vales if fetch returns empty', async () => {
      fetchMock.mockResponse(JSON.stringify({}), { status: 200 })
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () => {
        expect(screen.getByTestId('stat')).toHaveTextContent('0 days (0%)')
      })
    })

    it("text says 'day' instead of days", async () => {
      fetchMock.mockResponse(
        JSON.stringify({ ...mockData, goal_value_days: 1, goal_value_percentage: 10 }),
        {
          status: 200
        }
      )
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () =>
        expect(screen.getByTestId('stat')).toHaveTextContent('1 day (10%)')
      )
    })

    it('50% fill', async () => {
      fetchMock.mockResponse(
        JSON.stringify({ ...mockData, goal_value_days: 5, goal_value_percentage: 50 }),
        {
          status: 200
        }
      )
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () =>
        expect(screen.getByTestId('stat')).toHaveTextContent('5 days (50%)')
      )
    })

    it('full fill', async () => {
      fetchMock.mockResponse(
        JSON.stringify({ ...mockData, goal_value_days: 10, goal_value_percentage: 101 }),
        {
          status: 200
        }
      )
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () =>
        expect(screen.getByTestId('stat')).toHaveTextContent('10 days (101%)')
      )
    })

    it('full fill when duration too long', async () => {
      fetchMock.mockResponse(
        JSON.stringify({
          ...mockData,
          goal_value_days: 10135,
          goal_value_percentage: 101353
        }),
        {
          status: 200
        }
      )
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () =>
        expect(screen.getByTestId('stat')).toHaveTextContent('10135 days (101353%)')
      )
    })
  })

  describe('fetch disabled', () => {
    it('no fill', async () => {
      renderWithProviders(<LearningGoalBar disableFetch days={0} percentage={0} />)
      await waitFor(async () => {
        expect(screen.getByTestId('stat')).toHaveTextContent('0 days (0%)')
      })
    })
  })
})
