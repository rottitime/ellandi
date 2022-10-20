import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/lib/test-utils'
import RegisterDetailsForm from './RegisterDetailsForm'

const mockJobs = [
  {
    slug: 'dropdown-option-a',
    name: 'Dropdown option a',
    order: 32767
  }
]

describe('RegisterDetailsForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify(mockJobs), {
      status: 200
    })
  })

  const mockData = {
    first_name: 'test_first_name',
    last_name: 'test_last_name',
    job_title: 'test_job_title',
    business_unit: 'test_business_unit',
    location: 'test_location',
    line_manager_email: 'email@example.com'
  }

  it('renders', async () => {
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
    expect(screen.getByLabelText('Job title')).toBeInTheDocument()
    expect(screen.getByLabelText('Business unit')).toBeInTheDocument()
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
      expect(screen.getAllByText('This is a required field')).toHaveLength(6)
    })
  })

  it('fields are prepopulated', async () => {
    await renderWithProviders(
      <RegisterDetailsForm
        backUrl="/back"
        onFormSubmit={jest.fn()}
        defaultValues={Promise.resolve(mockData)}
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
        backUrl="/back"
        defaultValues={Promise.resolve(mockData)}
        onFormSubmit={(data) => mockSubmit(data)}
      />
    )

    const button = screen.getByRole('button', { name: /Continue/i })

    await userEvent.type(screen.getByTestId('textfield_first_name'), mockData.first_name)
    await userEvent.type(screen.getByTestId('textfield_last_name'), mockData.last_name)

    await userEvent.type(screen.getByLabelText('Job title'), mockData.job_title)

    await userEvent.type(screen.getByLabelText('Business unit'), mockData.business_unit)
    await userEvent.type(screen.getByTestId('textfield_location'), mockData.location)
    await userEvent.type(
      screen.getByTestId('textfield_line_manager_email'),
      mockData.line_manager_email
    )
    expect(screen.getByLabelText('Job title')).toHaveValue(mockData.job_title)

    await userEvent.click(button)

    await waitFor(async () => expect(mockSubmit).toHaveBeenCalledWith(mockData))
  })
})
