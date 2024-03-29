import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import LanguageList from './LanguageList'
import fetchMock from 'jest-fetch-mock'
import { bugfixForTimeout, mockLevels, renderWithProviders } from '@/lib/test-utils'
import { LanguagesType } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockSuccess: LanguagesType = {
  languages: [
    {
      id: 'test1',
      name: 'Skill Something A',
      speaking_level: 'great1',
      writing_level: 'nice1'
    },
    {
      id: 'test2',
      name: 'Skill Something B',
      speaking_level: 'great2',
      writing_level: 'nice2'
    },
    {
      id: 'test3',
      name: 'Skill Something C',
      speaking_level: 'great3',
      writing_level: 'nice3'
    }
  ]
}

describe('LanguageList', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders with data after loading', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockSuccess), { status: 200 }],
      [JSON.stringify(mockLevels), { status: 200 }]
    )

    renderWithProviders(<LanguageList />)

    expect(screen.getByTestId('skelton-table')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByText(mockSuccess.languages[0].name)).toBeInTheDocument()
    })
    expect(screen.getByText(mockSuccess.languages[1].name)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.languages[2].name)).toBeInTheDocument()

    expect(screen.getByText(mockSuccess.languages[0].speaking_level)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.languages[1].speaking_level)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.languages[2].speaking_level)).toBeInTheDocument()

    expect(screen.getByText(mockSuccess.languages[0].writing_level)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.languages[1].writing_level)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.languages[2].writing_level)).toBeInTheDocument()
  })

  it('message for no languages', async () => {
    fetchMock.mockResponses(
      [JSON.stringify({ ...mockSuccess, languages: [] }), { status: 200 }],
      [JSON.stringify(mockLevels), { status: 200 }]
    )
    renderWithProviders(<LanguageList />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByTestId('empty-rows')).toBeInTheDocument()
    })
  })

  describe.skip('on deleting', () => {
    it('successfully removes', async () => {
      fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
      renderWithProviders(<LanguageList />)
      await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))
      await waitFor(async () => {
        expect(screen.getByText(mockSuccess.languages[0].name)).toBeInTheDocument()
      })
      const deleteButton = screen.getByTestId('delete-button-test1')
      await waitFor(async () => {
        expect(deleteButton).toBeInTheDocument()
      })
      expect(screen.getByTestId('delete-button-test2')).toBeInTheDocument()
      expect(screen.getByTestId('delete-button-test3')).toBeInTheDocument()
      fetchMock.mockResponse(JSON.stringify({}), { status: 200 })
      await userEvent.click(deleteButton)
      await waitFor(async () => {
        expect(screen.queryByText(mockSuccess.languages[0].name)).not.toBeInTheDocument()
      })
    })
    it('successfully remove all', async () => {
      fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
      renderWithProviders(<LanguageList />)
      await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))
      await waitFor(async () => {
        expect(screen.getByText(mockSuccess.languages[0].name)).toBeInTheDocument()
      })
      expect(screen.queryByText('Add a language skill')).not.toBeInTheDocument()
      await userEvent.click(screen.getByTestId('delete-button-test1'))
      await userEvent.click(screen.getByTestId('delete-button-test2'))
      await userEvent.click(screen.getByTestId('delete-button-test3'))
      await waitFor(async () => {
        expect(screen.getByText('Add a language skill')).toBeInTheDocument()
      })
    })
  })
})
