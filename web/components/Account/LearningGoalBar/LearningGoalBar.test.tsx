import { screen, waitFor } from '@testing-library/react'
import LearningGoalBar from './LearningGoalBar'
import fetchMock from 'jest-fetch-mock'
import { bugfixForTimeout, renderWithProviders } from '@/lib/test-utils'
import { Props } from '@/components/UI/PercentageBar/types'
import { MeLearningRecord } from '@/service/types'

const mockData: MeLearningRecord[] = [
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
      await bugfixForTimeout()
      expect(screen.getByTestId('percentage')).toHaveTextContent('0')
    })

    it('50% fill', async () => {
      fetchMock.mockResponse(
        JSON.stringify([{ ...mockData[0], duration_minutes: 2250 }]),
        {
          status: 200
        }
      )
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () =>
        expect(screen.getByTestId('percentage')).toHaveTextContent('50')
      )
    })

    it('full fill', async () => {
      fetchMock.mockResponse(
        JSON.stringify([{ ...mockData[0], duration_minutes: 4500 }]),
        {
          status: 200
        }
      )
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () =>
        expect(screen.getByTestId('percentage')).toHaveTextContent('100')
      )
    })

    it('full fill when duration too long', async () => {
      fetchMock.mockResponse(
        JSON.stringify([{ ...mockData[0], duration_minutes: 4500111 }]),
        {
          status: 200
        }
      )
      renderWithProviders(<LearningGoalBar />)
      await waitFor(async () =>
        expect(screen.getByTestId('percentage')).toHaveTextContent('100')
      )
    })
  })
})
