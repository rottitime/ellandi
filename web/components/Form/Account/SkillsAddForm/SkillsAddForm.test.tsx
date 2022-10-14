import SkillsAddForm from './SkillsAddForm'
import fetchMock from 'jest-fetch-mock'
import {
  renderWithProviders,
  screen,
  waitFor,
  mockLevels,
  mockMe,
  mockSkills,
  mockSuggested
} from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'

//TODO: test deletes, showall

describe('SkillsAddForm', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('On adding suggested skills', async () => {})

  describe('Show all', () => {
    beforeEach(() => {
      fetchMock.mockResponses(
        [JSON.stringify(mockLevels), { status: 200 }],
        [JSON.stringify(mockMe), { status: 200 }],
        [JSON.stringify(mockSkills), { status: 200 }]
      )
    })
    it('renders', async () => {
      renderWithProviders(
        <SkillsAddForm
          loading={false}
          onFormSubmit={jest.fn()}
          showAll
          suggestionProps={{ data: mockSuggested }}
        />
      )

      await waitFor(() => {
        expect(screen.getByText(mockLevels[0].name)).toBeInTheDocument()
      })
      expect(screen.getByText(mockLevels[1].name)).toBeInTheDocument()
      expect(screen.getByText(mockLevels[2].name)).toBeInTheDocument()
      expect(screen.getByText(mockLevels[3].name)).toBeInTheDocument()
      expect(screen.getByText(mockLevels[4].name)).toBeInTheDocument()
      expect(screen.getByText(mockSuggested[0])).toBeInTheDocument()
      expect(screen.getByText(mockSuggested[1])).toBeInTheDocument()
      expect(screen.getByText(mockSuggested[2])).toBeInTheDocument()
    })
  })
})
