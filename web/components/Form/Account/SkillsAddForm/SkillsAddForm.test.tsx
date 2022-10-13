import { screen, waitFor } from '@testing-library/react'
import SkillsAddForm from './SkillsAddForm'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import { MeSuggestedSkillsResponse } from '@/service/types'
import userEvent from '@testing-library/user-event'

const suggestionsData: MeSuggestedSkillsResponse = [
  'Flying',
  'Acrobats',
  'Train spotting',
  'Pizza',
  'Todu',
  'Onions',
  'Apples',
  'Nuts',
  'Seitan',
  'Noodles',
  'Orange'
]

describe('SkillsAddForm', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    const description = 'some random text for description'
    renderWithProviders(
      <SkillsAddForm
        data={suggestionsData}
        description={description}
        onSelected={jest.fn()}
      />
    )

    expect(screen.getByText(suggestionsData[0])).toBeInTheDocument()
    expect(screen.getByText(suggestionsData[1])).toBeInTheDocument()
    expect(screen.getByText(suggestionsData[2])).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByTestId('suggestion-box')).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByTestId('suggestion-box')).toBeVisible()
  })

  it('on selected', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(suggestionsData), { status: 200 })
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsAddForm hideOptions={[]} onSelected={mockClick} data={suggestionsData} />
    )

    await waitFor(() => {
      expect(screen.getByText(suggestionsData[0])).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText(suggestionsData[1]))

    expect(mockClick).toHaveBeenLastCalledWith('Acrobats')
  })

  it('hides options', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsAddForm
        hideOptions={[suggestionsData[1]]}
        data={suggestionsData}
        onSelected={mockClick}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(suggestionsData[0])).toBeInTheDocument()
    })
    expect(screen.queryByText(suggestionsData[1])).not.toBeInTheDocument()
  })

  it('on empty fetch', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsAddForm hideOptions={[]} onSelected={mockClick} data={[]} />
    )

    expect(screen.getByTestId('suggestion-box')).toBeInTheDocument()
    expect(screen.getByTestId('suggestion-box')).toHaveAttribute('aria-hidden', 'true')
  })

  it('replaces suggestions', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsAddForm
        hideOptions={[]}
        onSelected={mockClick}
        data={suggestionsData}
        max={5}
      />
    )
    expect(screen.getByText(suggestionsData[0])).toBeInTheDocument()
    expect(screen.queryByText(suggestionsData[5])).not.toBeInTheDocument()

    await userEvent.click(screen.getByText(suggestionsData[0]))
    expect(screen.queryByText(suggestionsData[0])).not.toBeInTheDocument()
    expect(screen.getByText(suggestionsData[5])).toBeInTheDocument()
  })
})
