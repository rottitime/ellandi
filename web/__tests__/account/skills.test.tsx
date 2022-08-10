import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import SkillsPage from '@/pages/account/skills/[[...tab]]'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'

const mockSuccess = {
  skills: [
    { name: 'Skill Something A', level: 'Jon' },
    { name: 'Skill Something B', level: 'Cersei' },
    { name: 'Skill Something C', level: 'Jaime' }
  ],
  languages: [
    {
      name: 'French',
      speaking_level: null,
      writing_level: null
    },
    {
      name: 'Indonesian',
      speaking_level: null,
      writing_level: null
    }
  ]
}

const bugfixForTimeout = async () =>
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))

describe('Page: Account / Skills', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders with data after loading', async () => {
    fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    renderWithProviders(<SkillsPage tabIndex={0} />)

    expect(screen.getByTestId('skelton-table')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByText(mockSuccess.skills[0].name)).toBeInTheDocument()
    })
    expect(screen.getByText(mockSuccess.skills[1].name)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.skills[2].name)).toBeInTheDocument()

    expect(screen.getByText(mockSuccess.skills[0].level)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.skills[1].level)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.skills[2].level)).toBeInTheDocument()
  })

  it.skip('message for no skills', async () => {
    fetchMock.mockResponse(JSON.stringify({ ...mockSuccess, skills: [] }), {
      status: 200
    })
    renderWithProviders(<SkillsPage tabIndex={0} />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByText('Enter a skill')).toBeInTheDocument()
    })
  })
})
