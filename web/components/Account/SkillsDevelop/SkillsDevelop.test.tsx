import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import SkillsDevelop from './SkillsDevelop'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import { SkillsDevelopType } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockSuccess: SkillsDevelopType = {
  skills_develop: [
    { id: 'test1', name: 'Skill Something A' },
    { id: 'test2', name: 'Skill Something B' },
    { id: 'test3', name: 'Skill Something C' }
  ]
}

const bugfixForTimeout = async () =>
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))

describe('SkillsDevelop', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders with data after loading', async () => {
    fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    renderWithProviders(<SkillsDevelop />)

    expect(screen.getByTestId('skelton-table')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByText(mockSuccess.skills_develop[0].name)).toBeInTheDocument()
    })
    expect(screen.getByText(mockSuccess.skills_develop[1].name)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess.skills_develop[2].name)).toBeInTheDocument()
  })

  it('message for no skills', async () => {
    fetchMock.mockResponse(JSON.stringify({ ...mockSuccess, skills_develop: [] }), {
      status: 200
    })
    renderWithProviders(<SkillsDevelop />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByTestId('empty-rows')).toBeInTheDocument()
    })
  })

  describe('on deleting', () => {
    it('renders confirm modal', async () => {
      fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
      renderWithProviders(<SkillsDevelop />)
      await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

      await waitFor(async () => {
        expect(screen.getByText(mockSuccess.skills_develop[0].name)).toBeInTheDocument()
      })

      await userEvent.click(screen.getByTestId('delete-button-test1'))
      await waitFor(async () => {
        expect(screen.getByTestId('datagrid-delete-modal')).toBeVisible()
      })
    })

    it('successfully removes', async () => {
      fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
      renderWithProviders(<SkillsDevelop />)
      await waitForElementToBeRemoved(() => screen.queryByTestId('skelton-table'))

      await waitFor(async () => {
        expect(screen.getByText(mockSuccess.skills_develop[0].name)).toBeInTheDocument()
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
        expect(screen.getByTestId('datagrid-delete-modal')).toBeVisible()
      })

      const modalButton = screen.getByRole('button', { name: /Delete/i })

      await userEvent.click(modalButton)

      await waitFor(async () => {
        expect(
          screen.queryByText(mockSuccess.skills_develop[0].name)
        ).not.toBeInTheDocument()
      })
    })
  })
})
