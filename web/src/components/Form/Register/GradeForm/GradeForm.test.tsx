import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/lib/test-utils'
import GradeForm from './GradeForm'

const mockResponse = [
  { slug: 'a', name: 'A' },
  { slug: 'b', name: 'B' }
]

jest.mock(
  '@/prefetch/grades.json',
  () => [
    { slug: 'a', name: 'A' },
    { slug: 'b', name: 'B' }
  ],
  { virtual: true }
)

describe('GradeForm', () => {
  it('renders', async () => {
    renderWithProviders(
      <GradeForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    await waitFor(async () => {
      expect(screen.getByText(mockResponse[0].name)).toBeInTheDocument()
    })

    expect(screen.getByText(mockResponse[1].name)).toBeInTheDocument()
  })

  it('fields are prepopulated', async () => {
    const mockData = mockResponse[0]

    renderWithProviders(
      <GradeForm
        backUrl="/back"
        onFormSubmit={jest.fn()}
        defaultValues={{ grade: mockData.name, grade_other: '' }}
      />
    )

    await waitFor(async () => {
      expect(screen.getByDisplayValue(mockData.name)).toBeChecked()
    })
  })

  it('submits', async () => {
    const mockData = mockResponse[0]
    const mockSubmit = jest.fn()

    renderWithProviders(
      <GradeForm
        defaultValues={null}
        backUrl="/back"
        onFormSubmit={(data) => mockSubmit(data)}
      />
    )

    await waitFor(async () => {
      expect(screen.getByDisplayValue(mockData.name)).toBeInTheDocument()
    })

    const button = screen.getByRole('button', { name: /Continue/i })

    await userEvent.click(screen.getByLabelText(mockData.name))
    await userEvent.click(button)

    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalled()
    })
  })
})
