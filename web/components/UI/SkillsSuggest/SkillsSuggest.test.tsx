import SkillsSuggest from './SkillsSuggest'
import { renderWithProviders, mockSuggested, screen, waitFor } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'

describe('SkillsSuggest', () => {
  it('renders', async () => {
    const description = 'some random text for description'
    renderWithProviders(
      <SkillsSuggest
        data={mockSuggested}
        description={description}
        onSelected={jest.fn()}
      />
    )

    expect(screen.getByText(mockSuggested[0])).toBeInTheDocument()
    expect(screen.getByText(mockSuggested[1])).toBeInTheDocument()
    expect(screen.getByText(mockSuggested[2])).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByTestId('suggestion-box')).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByTestId('suggestion-box')).toBeVisible()
  })

  it('on selected', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsSuggest hideOptions={[]} onSelected={mockClick} data={mockSuggested} />
    )

    await waitFor(() => {
      expect(screen.getByText(mockSuggested[0])).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText(mockSuggested[1]))

    expect(mockClick).toHaveBeenLastCalledWith('Acrobats')
  })

  it('hides options', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsSuggest
        hideOptions={[mockSuggested[1]]}
        data={mockSuggested}
        onSelected={mockClick}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(mockSuggested[0])).toBeInTheDocument()
    })
    expect(screen.queryByText(mockSuggested[1])).not.toBeInTheDocument()
  })

  it('on empty fetch', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsSuggest hideOptions={[]} onSelected={mockClick} data={[]} />
    )

    expect(screen.getByTestId('suggestion-box')).toBeInTheDocument()
    expect(screen.getByTestId('suggestion-box')).toHaveAttribute('aria-hidden', 'true')
  })

  it('replaces suggestions', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsSuggest
        hideOptions={[]}
        onSelected={mockClick}
        data={mockSuggested}
        max={5}
      />
    )
    expect(screen.getByText(mockSuggested[0])).toBeInTheDocument()
    expect(screen.queryByText(mockSuggested[5])).not.toBeInTheDocument()

    await userEvent.click(screen.getByText(mockSuggested[0]))
    expect(screen.queryByText(mockSuggested[0])).not.toBeInTheDocument()
    expect(screen.getByText(mockSuggested[5])).toBeInTheDocument()
  })
})
