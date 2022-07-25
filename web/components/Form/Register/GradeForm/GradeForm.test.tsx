import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/lib/test-utils'
import GradeForm from './GradeForm'
import fetchMock from 'jest-fetch-mock'

describe('GradeForm', () => {
  const mockResponse = [
    { slug: 'a', name: 'A' },
    { slug: 'b', name: 'B' }
  ]

  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), {
      status: 200
    })
  })

  it('renders', async () => {
    renderWithProviders(<GradeForm backUrl="/back" onFormSubmit={jest.fn()} />)

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
        defaultValues={{ grade: mockData.slug, grade_other: '' }}
      />
    )

    await waitFor(async () => {
      expect(screen.getByDisplayValue(mockData.slug)).toBeChecked()
    })
  })

  it.skip('submits', async () => {
    const mockData = mockResponse[0]
    const mockSubmit = jest.fn()

    renderWithProviders(
      <GradeForm backUrl="/back" onFormSubmit={(data) => mockSubmit(data)} />
    )

    await waitFor(async () => {
      expect(screen.getByDisplayValue(mockData.slug)).toBeInTheDocument()
    })

    const button = screen.getByRole('button', { name: /Continue/i })

    await userEvent.click(screen.getByLabelText(mockData.name))
    await userEvent.click(button)

    await waitFor(async () =>
      expect(mockSubmit).toHaveBeenCalledWith({ grade: mockData.slug })
    )
  })
})
