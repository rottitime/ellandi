import { renderWithProviders, screen, waitFor } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import LearningAddForm from './LearningAddForm'

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
