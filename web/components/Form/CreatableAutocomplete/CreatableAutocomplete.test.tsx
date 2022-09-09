import { screen, waitFor } from '@testing-library/react'
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
    renderWithProviders(
      <CreatableAutocomplete
        label="my-label"
        defaultValue="my-default-value"
        options={mockOptions}
        onChange={jest.fn()}
      />
    )

    const textfield = screen.getByLabelText('my-label')
    expect(textfield).toHaveValue('my-default-value')
    expect(textfield).toBeInTheDocument()
  })

  it('renders with value', async () => {
    renderWithProviders(
      <CreatableAutocomplete
        label="my-label"
        value="my-value"
        options={mockOptions}
        onChange={jest.fn()}
      />
    )
    expect(screen.getByLabelText('my-label')).toHaveValue('my-value')
  })

  it('loading', async () => {
    renderWithProviders(
      <CreatableAutocomplete
        label="my-label"
        loading={true}
        options={[]}
        onChange={jest.fn()}
      />
    )

    await userEvent.click(screen.getByLabelText('my-label'))

    await waitFor(async () => {
      expect(screen.getByTestId('loading-icon')).toBeInTheDocument()
    })
    expect(screen.getByText('Loading…')).toBeInTheDocument()
  })

  describe('on typing', () => {
    it('renders full list', async () => {
      renderWithProviders(
        <CreatableAutocomplete
          label="my-label"
          options={mockOptions}
          onChange={jest.fn()}
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
      renderWithProviders(
        <CreatableAutocomplete
          label="my-label"
          options={mockOptions}
          onChange={jest.fn()}
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

    it('shows disabled', async () => {
      const mockSelected = jest.fn()
      renderWithProviders(
        <CreatableAutocomplete
          label="my-label"
          disableOptions={[mockOptions[1].title]}
          options={mockOptions}
          onChange={(data) => mockSelected(data)}
        />
      )

      const textfield = screen.getByLabelText('my-label')
      await userEvent.click(textfield)
      const option = screen.getByText(mockOptions[1].title)
      expect(option).toBeVisible()
      expect(option).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('on selecting', () => {
    it('sets value', async () => {
      const mockSelected = jest.fn()
      renderWithProviders(
        <CreatableAutocomplete
          label="my-label"
          options={mockOptions}
          onChange={(data) => mockSelected(data)}
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
      expect(mockSelected).toHaveBeenLastCalledWith(mockOptions[1].title)
    })
  })
})
