import SkillsList from './SkillsList'
import fetchMock from 'jest-fetch-mock'
import {
  bugfixForTimeout,
  renderWithProviders,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  mockMeSkills
} from '@/lib/test-utils'
import { SkillsType } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockSuccess: SkillsType = { skills: mockMeSkills }

describe('SkillsList', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders with data after loading', async () => {
    fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    renderWithProviders(<SkillsList />)

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

  it('pending skill', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        skills: [
          ...mockMeSkills,
          {
            id: '1232s',
            name: 'Pending skill',
            level: 'super',
            pending: true
          }
        ]
      }),
      { status: 200 }
    )
    renderWithProviders(<SkillsList />)

    await waitFor(async () => {
      expect(screen.getByText(mockSuccess.skills[0].name)).toBeInTheDocument()
    })
    expect(screen.getByTestId('status-pending')).toBeInTheDocument()
  })

  it('message for no skills', async () => {
    fetchMock.mockResponse(JSON.stringify({ ...mockSuccess, skills: [] }), {
      status: 200
    })
    renderWithProviders(<SkillsList />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByTestId('empty-rows')).toBeInTheDocument()
    })
  })

  describe('on deleting', () => {
    it('successfully removes', async () => {
      fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
      renderWithProviders(<SkillsList />)
      await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

      await waitFor(async () => {
        expect(screen.getByText(mockSuccess.skills[0].name)).toBeInTheDocument()
      })

      await waitFor(async () => {
        expect(screen.getByTestId('delete-button-test1')).toBeInTheDocument()
      })
      expect(screen.getByTestId('delete-button-test2')).toBeInTheDocument()
      expect(screen.getByTestId('delete-button-test3')).toBeInTheDocument()

      fetchMock.mockResponse(JSON.stringify({}), { status: 200 })

      await userEvent.click(screen.getByTestId('delete-button-test1'))

      await waitFor(async () => {
        expect(screen.getByTestId('datagrid-delete-modal')).toBeVisible()
      })

      const modalButton = screen.getByRole('button', { name: /Delete/i })

      await userEvent.click(modalButton)

      await waitFor(async () => {
        expect(screen.queryByText(mockSuccess.skills[0].name)).not.toBeInTheDocument()
      })
    })
  })
})
