import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { bugfixForTimeout, mockMe, renderWithProviders } from '@/lib/test-utils'
import ProfessionForm from './ProfessionForm'

const mockResponse = [
  { slug: 'a', name: 'Opton 1' },
  { slug: 'b', name: 'Opton 2' },
  { slug: 'c', name: 'Opton 3' },
  { slug: 'd', name: 'Other' }
]

jest.mock(
  '@/prefetch/professions.json',
  () => [
    { slug: 'a', name: 'Opton 1' },
    { slug: 'b', name: 'Opton 2' },
    { slug: 'c', name: 'Opton 3' },
    { slug: 'd', name: 'Other' }
  ],
  { virtual: true }
)

describe('ProfessionForm', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    renderWithProviders(
      <ProfessionForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    await waitFor(async () => {
      expect(screen.getByText('Opton 1')).toBeInTheDocument()
    })

    expect(screen.getByText(mockResponse[1].name)).toBeInTheDocument()
    expect(screen.getByText(mockResponse[2].name)).toBeInTheDocument()
    expect(screen.getByText(mockResponse[3].name)).toBeInTheDocument()
  })

  it('hides primary profession', async () => {
    fetchMock.mockResponse(
      JSON.stringify({ ...mockMe, primary_profession: mockResponse[1].name }),
      { status: 200 }
    )
    renderWithProviders(
      <ProfessionForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )
    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByText(mockResponse[0].name)).toBeInTheDocument()
    })

    expect(screen.queryByText(mockResponse[1].name)).not.toBeInTheDocument()
    expect(screen.getByText(mockResponse[2].name)).toBeInTheDocument()
  })

  it('shows other field', async () => {
    fetchMock.mockResponse(JSON.stringify(mockMe), { status: 200 })
    renderWithProviders(
      <ProfessionForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    await userEvent.click(screen.getByLabelText(mockResponse[3].name))

    expect(screen.queryByTestId('other-field')).toBeVisible()
    expect(await (await screen.findAllByTestId('other-field')).length).toEqual(1)
  })
})
