import { screen, waitFor } from '@testing-library/react'
import SkillsSuggest from './SkillsSuggest'
import fetchMock from 'jest-fetch-mock'
import { bugfixForTimeout, renderWithProviders } from '@/lib/test-utils'
import { MeSuggestedSkillsResponse } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockSuggestions: MeSuggestedSkillsResponse = [
  'Flying',
  'Acrobats',
  'Train spotting'
]

describe('SkillsSuggest', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSuggestions), { status: 200 })
    renderWithProviders(<SkillsSuggest hideOptions={[]} onSelected={jest.fn()} />)

    await waitFor(() => {
      expect(screen.getByText(mockSuggestions[0])).toBeInTheDocument()
    })
    expect(screen.getByText(mockSuggestions[1])).toBeInTheDocument()
    expect(screen.getByText(mockSuggestions[2])).toBeInTheDocument()
    expect(screen.getByTestId('suggestion-box')).toBeVisible()
  })

  it('on selected', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSuggestions), { status: 200 })
    const mockClick = jest.fn()
    renderWithProviders(<SkillsSuggest hideOptions={[]} onSelected={mockClick} />)

    await waitFor(() => {
      expect(screen.getByText(mockSuggestions[0])).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText(mockSuggestions[1]))

    expect(mockClick).toHaveBeenLastCalledWith('Acrobats')
  })

  it('hides options', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSuggestions), { status: 200 })
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsSuggest hideOptions={[mockSuggestions[1]]} onSelected={mockClick} />
    )

    await waitFor(() => {
      expect(screen.getByText(mockSuggestions[0])).toBeInTheDocument()
    })
    expect(screen.queryByText(mockSuggestions[1])).not.toBeInTheDocument()
  })

  it('on empty fetch', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 })
    const mockClick = jest.fn()
    renderWithProviders(<SkillsSuggest hideOptions={[]} onSelected={mockClick} />)

    await bugfixForTimeout()
    await waitFor(() => expect(fetch).toBeCalled())

    expect(screen.getByTestId('suggestion-box')).toHaveAttribute('aria-hidden', 'true')
  })
})
