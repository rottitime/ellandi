import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/lib/test-utils'
import RegisterDetailsForm from './RegisterDetailsForm'

describe('RegisterDetailsForm', () => {
  const mockData = {
    first_name: 'test_first_name',
    last_name: 'test_last_name',
    job_title: 'test_job_title',
    business_unit: 'test_business_unit',
    location: 'test_location',
    line_manager_email: 'email@email.com'
  }

  it('renders', () => {
    renderWithProviders(
      <RegisterDetailsForm
        defaultValues={null}
        backUrl="/back"
        onFormSubmit={jest.fn()}
      />
    )

    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument()

    expect(screen.getByTestId('textfield_first_name')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_last_name')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_job_title')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_business_unit')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_location')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_line_manager_email')).toBeInTheDocument()
  })

  it('errors for required fields', async () => {
    renderWithProviders(
      <RegisterDetailsForm
        defaultValues={null}
        backUrl="/back"
        onFormSubmit={jest.fn()}
      />
    )

    const button = screen.getByRole('button', { name: /Continue/i })
    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getAllByText('This field is required')).toHaveLength(6)
    })
  })

  it('fields are prepopulated', async () => {
    renderWithProviders(
      <RegisterDetailsForm
        backUrl="/back"
        onFormSubmit={jest.fn()}
        defaultValues={mockData}
      />
    )

    Object.keys(mockData).forEach(
      (key) => async () =>
        expect(screen.getByTestId(`textfield_${key}`)).toHaveValue(mockData[key])
    )
  })

  it('submits', async () => {
    const mockSubmit = jest.fn()

    renderWithProviders(
      <RegisterDetailsForm
        defaultValues={null}
        backUrl="/back"
        onFormSubmit={(data) => mockSubmit(data)}
      />
    )

    const button = screen.getByRole('button', { name: /Continue/i })

    await userEvent.type(screen.getByTestId('textfield_first_name'), mockData.first_name)
    await userEvent.type(screen.getByTestId('textfield_last_name'), mockData.last_name)
    await userEvent.type(screen.getByTestId('textfield_job_title'), mockData.job_title)
    await userEvent.type(
      screen.getByTestId('textfield_business_unit'),
      mockData.business_unit
    )
    await userEvent.type(screen.getByTestId('textfield_location'), mockData.location)
    await userEvent.type(
      screen.getByTestId('textfield_line_manager_email'),
      mockData.line_manager_email
    )

    await userEvent.click(button)
    await waitFor(async () => expect(mockSubmit).toHaveBeenCalledWith(mockData))
  })
})
