import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import CreatableAutocomplete from './CreatableAutocomplete'
import { renderWithProviders } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'

const mockOptions = [
  { title: 'First suggested title' },
  { title: 'Second suggested title' },
  { title: 'Third suggested title' }
]

describe('CreatableAutocomplete', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders default', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <CreatableAutocomplete
        label="my-label"
        defaultValue="my-default-value"
        value="my-value"
        options={mockOptions}
        onSelected={mockSubmit}
      />
    )

    const textfield = screen.getByLabelText('my-label')
    expect(textfield).toHaveValue('my-value')
    expect(textfield).toBeInTheDocument()
  })

  it('loading', async () => {
    const mockSelected = jest.fn()
    renderWithProviders(
      <CreatableAutocomplete
        label="my-label"
        loading={true}
        options={[]}
        onSelected={mockSelected}
      />
    )

    await userEvent.click(screen.getByLabelText('my-label'))

    await waitFor(async () => {
      expect(screen.getByTestId('loading-icon')).toBeInTheDocument()
    })
    expect(screen.getByText('Loading…')).toBeInTheDocument()
  })

  describe('user types', () => {
    it('renders full list', async () => {
      const mockSelected = jest.fn()
      renderWithProviders(
        <CreatableAutocomplete
          label="my-label"
          loading={true}
          options={mockOptions}
          onSelected={mockSelected}
        />
      )

      const textfield = screen.getByLabelText('my-label')

      await userEvent.click(textfield)

      await waitFor(async () => {
        expect(screen.getByText(mockOptions[0].title)).toBeVisible()
      })
      expect(screen.getByText(mockOptions[1].title)).toBeVisible()
      expect(screen.getByText(mockOptions[2].title)).toBeVisible()
    })

    it('shows matches', async () => {
      const mockSelected = jest.fn()
      renderWithProviders(
        <CreatableAutocomplete
          label="my-label"
          loading={true}
          options={mockOptions}
          onSelected={mockSelected}
        />
      )

      const textfield = screen.getByLabelText('my-label')

      await userEvent.click(textfield)

      await waitFor(async () => {
        expect(screen.getByText(mockOptions[0].title)).toBeVisible()
      })

      await userEvent.type(textfield, 'Sec')

      expect(screen.getByText(mockOptions[1].title)).toBeVisible()
      expect(screen.queryByText(mockOptions[0].title)).not.toBeInTheDocument()
      expect(screen.queryByText(mockOptions[2].title)).not.toBeInTheDocument()
    })
  })

  describe('user selects', () => {
    it('sets value', async () => {
      const mockSelected = jest.fn()
      renderWithProviders(
        <CreatableAutocomplete
          label="my-label"
          loading={true}
          options={mockOptions}
          onSelected={mockSelected}
        />
      )

      const textfield = screen.getByLabelText('my-label')

      expect(textfield).toHaveValue('')

      await userEvent.click(textfield)

      await waitFor(async () => {
        expect(screen.getByText(mockOptions[0].title)).toBeVisible()
      })

      await userEvent.click(screen.getByText(mockOptions[1].title))

      expect(textfield).toHaveValue(mockOptions[1].title)
    })
  })
})
