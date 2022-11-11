import LearningDistribution from './LearningDistribution'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, screen } from '@/lib/test-utils'
import { Props } from '@/components/UI/PercentageBar/types'

jest.mock('@/components/UI/PercentageBar/PercentageBar', () => (props: Props) => (
  <>
    {' '}
    <div data-testid="percentage1">{props?.data[0]?.percentage}</div>
    <div data-testid="percentage2">{props?.data[1]?.percentage}</div>
    <div data-testid="percentage3">{props?.data[2]?.percentage}</div>
  </>
))

describe('LearningDistribution', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    renderWithProviders(
      <LearningDistribution
        barData={[
          {
            name: 'On the job',
            value_percentage: 20
          },
          {
            name: 'Social',
            value_percentage: 70
          },
          {
            name: 'Formal',
            value_percentage: 10
          }
        ]}
      />
    )
    expect(screen.getByTestId('percentage1')).toHaveTextContent('20')
    expect(screen.getByTestId('percentage2')).toHaveTextContent('70')
    expect(screen.getByTestId('percentage3')).toHaveTextContent('10')
  })

  it('no data', async () => {
    renderWithProviders(<LearningDistribution barData={undefined} />)
    expect(screen.getByTestId('percentage1')).toHaveTextContent('0')
    expect(screen.getByTestId('percentage2')).toHaveTextContent('0')
    expect(screen.getByTestId('percentage3')).toHaveTextContent('0')
  })
})
