import {
  getByTestId,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SkillsPage from '@/pages/account/skills/[[...tab]]'
import fetchMock from 'jest-fetch-mock'
import Router from 'next/router'
import { renderWithProviders } from '@/lib/test-utils'

const mockSuccess = {
  skills: [
    { name: 'Snow', level: 'Jon' },
    { name: 'Lannister', level: 'Cersei' },
    { name: 'Lannister1', level: 'Jaime' },
    { name: 'Stark', level: 'Arya' },
    { name: 'Targaryen', level: 'Daenerys' },
    { name: 'Melisandre', level: null },
    { name: 'Clifford', level: 'Ferrara' },
    { name: 'Frances', level: 'Rossini' },
    { name: 'Roxie', level: 'Harvey' }
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

describe('Page: Sign in', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    const view = await renderWithProviders(<SkillsPage tabIndex={0} />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))

    await waitFor(async () => {
      expect(screen.getByText('Lannister')).toBeInTheDocument()
    })
  })
})
