import { renderWithProviders, screen, waitFor } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import LearningAddForm from './LearningAddForm'
import { FormData } from './types'

const mockData: FormData = {
  name: 'Skill Something A',
  duration_minutes: 122,
  date_completed: '2022-01-23',
  cost_pounds: 101,
  cost_unknown: null
}

describe('LearningAddForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    renderWithProviders(<LearningAddForm loading={false} onFormSubmit={jest.fn()} />)
    expect(screen.getByRole('button', { name: /Save learning/i })).toBeInTheDocument()
    expect(screen.getByTestId('textfield_name')).toBeInTheDocument()
    expect(screen.getByTestId('datepicker')).toBeInTheDocument()
    expect(screen.getByTestId('duration-days')).toBeInTheDocument()
    expect(screen.getByTestId('duration-minutes')).toBeInTheDocument()
    expect(screen.getByTestId('duration-hours')).toBeInTheDocument()
  })

  it('renders formal type', async () => {
    renderWithProviders(
      <LearningAddForm loading={false} onFormSubmit={jest.fn()} type="formal" />
    )
    expect(screen.getByRole('button', { name: /Save learning/i })).toBeInTheDocument()
    expect(screen.getByTestId('textfield_name')).toBeInTheDocument()
    expect(screen.getByTestId('datepicker')).toBeInTheDocument()
    expect(screen.getByTestId('duration-days')).toBeInTheDocument()
    expect(screen.getByTestId('duration-minutes')).toBeInTheDocument()
    expect(screen.getByTestId('duration-hours')).toBeInTheDocument()

    expect(screen.getByTestId('textfield_cost_pounds')).toBeInTheDocument()
    expect(screen.getByLabelText('Unknown')).toBeInTheDocument()
  })

  it('prepopulates', async () => {
    renderWithProviders(
      <LearningAddForm
        loading={false}
        onFormSubmit={jest.fn()}
        type="formal"
        defaultValues={mockData}
      />
    )

    expect(screen.getByTestId('textfield_name')).toHaveValue(mockData.name)
    expect(screen.getByTestId('datepicker')).toHaveValue('23/01/2022')
    expect(screen.getByTestId('duration-days')).toHaveValue(0)
    expect(screen.getByTestId('duration-minutes')).toHaveValue(2)
    expect(screen.getByTestId('duration-hours')).toHaveValue(2)
    expect(screen.getByTestId('textfield_cost_pounds')).toHaveValue(101)
  })

  describe('Validation error', () => {
    it('for durations as 0', async () => {
      renderWithProviders(<LearningAddForm loading={false} onFormSubmit={jest.fn()} />)
      const button = screen.getByRole('button', { name: /Save learning/i })

      await userEvent.type(screen.getByTestId('duration-days'), '0')
      await userEvent.click(button)
      await waitFor(
        async () =>
          await expect(screen.getByText('you must specify a number')).toBeInTheDocument()
      )
    })
  })
})
