import { screen, waitFor } from '@testing-library/react'
import SkillsSuggest from './SkillsSuggest'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import { MeSuggestedSkillsResponse } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockData: MeSuggestedSkillsResponse = [
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

describe('SkillsSuggest', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    const description = 'some random text for description'
    renderWithProviders(
      <SkillsSuggest data={mockData} description={description} onSelected={jest.fn()} />
    )

    expect(screen.getByText(mockData[0])).toBeInTheDocument()
    expect(screen.getByText(mockData[1])).toBeInTheDocument()
    expect(screen.getByText(mockData[2])).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByTestId('suggestion-box')).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByTestId('suggestion-box')).toBeVisible()
  })

  it('on selected', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsSuggest hideOptions={[]} onSelected={mockClick} data={mockData} />
    )

    await waitFor(() => {
      expect(screen.getByText(mockData[0])).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText(mockData[1]))

    expect(mockClick).toHaveBeenLastCalledWith('Acrobats')
  })

  it('hides options', async () => {
    const mockClick = jest.fn()
    renderWithProviders(
      <SkillsSuggest hideOptions={[mockData[1]]} data={mockData} onSelected={mockClick} />
    )

    await waitFor(() => {
      expect(screen.getByText(mockData[0])).toBeInTheDocument()
    })
    expect(screen.queryByText(mockData[1])).not.toBeInTheDocument()
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
      <SkillsSuggest hideOptions={[]} onSelected={mockClick} data={mockData} max={5} />
    )
    expect(screen.getByText(mockData[0])).toBeInTheDocument()
    expect(screen.queryByText(mockData[5])).not.toBeInTheDocument()

    await userEvent.click(screen.getByText(mockData[0]))
    expect(screen.queryByText(mockData[0])).not.toBeInTheDocument()
    expect(screen.getByText(mockData[5])).toBeInTheDocument()
  })
})
