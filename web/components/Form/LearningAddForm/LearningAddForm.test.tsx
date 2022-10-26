import { renderWithProviders, screen, waitFor } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import LearningAddForm from './LearningAddForm'
import { FormData } from './types'

const mockData: FormData = {
  id: 'test1',
  learning_type: 'Holiday',
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

    expect(screen.getByTestId('cost-field')).toBeInTheDocument()
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
    expect(screen.getByTestId('cost-field')).toHaveValue(101)
  })

  describe("type 'generic'", () => {
    it('submits generic', async () => {
      const mockSubmit = jest.fn()
      renderWithProviders(
        <LearningAddForm loading={false} onFormSubmit={(data) => mockSubmit(data)} />
      )

      await userEvent.type(screen.getByTestId('textfield_name'), mockData.name)
      await userEvent.type(screen.getByTestId('datepicker'), '23/01/2022')
      await userEvent.type(screen.getByTestId('duration-days'), '1')
      await userEvent.type(screen.getByTestId('duration-minutes'), '0')
      await userEvent.type(screen.getByTestId('duration-hours'), '0')
      await userEvent.click(screen.getByRole('button', { name: /Save learning/i }))

      expect(mockSubmit).toHaveBeenCalled()

      expect(mockSubmit).toHaveBeenCalledWith({
        date_completed: '2022-01-23',
        duration_minutes: 444,
        name: 'Skill Something A'
      })
    })

    it("removes any 'formal' type values on submit", async () => {
      const data = mockData
      const mockSubmit = jest.fn()
      renderWithProviders(
        <LearningAddForm
          defaultValues={data}
          loading={false}
          onFormSubmit={(data) => mockSubmit(data)}
        />
      )
      await userEvent.click(screen.getByRole('button', { name: /Save learning/i }))

      expect(mockSubmit).toHaveBeenCalled()

      delete data.cost_pounds
      delete data.cost_unknown

      expect(mockSubmit).toHaveBeenCalledWith(data)
    })
  })

  it('cost with 0 value', async () => {
    renderWithProviders(
      <LearningAddForm loading={false} type="formal" onFormSubmit={jest.fn()} />
    )
    const costField = screen.getByTestId('cost-field')
    expect(costField).toBeInTheDocument()
    await userEvent.type(costField, '0')
    expect(costField).toHaveValue(0)
  })

  it('submits formal', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <LearningAddForm
        loading={false}
        onFormSubmit={(data) => mockSubmit(data)}
        type="formal"
      />
    )

    await userEvent.type(screen.getByTestId('textfield_name'), mockData.name)
    await userEvent.type(screen.getByTestId('datepicker'), '23/01/2022')
    await userEvent.type(screen.getByTestId('duration-days'), '1')
    await userEvent.type(screen.getByTestId('duration-minutes'), '0')
    await userEvent.type(screen.getByTestId('duration-hours'), '0')
    await userEvent.type(screen.getByTestId('cost-field'), '101')
    await userEvent.click(screen.getByRole('button', { name: /Save learning/i }))

    expect(mockSubmit).toHaveBeenCalled()

    expect(mockSubmit).toHaveBeenCalledWith({
      cost_pounds: 101,
      cost_unknown: false,
      date_completed: '2022-01-23',
      duration_minutes: 444,
      name: 'Skill Something A'
    })
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
