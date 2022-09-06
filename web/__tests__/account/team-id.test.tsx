import { screen, waitFor } from '@testing-library/react'
import TeamMemberPage from '@/pages/account/your-team/member'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe, mockTeam } from '@/lib/test-utils'

const mockRouter = jest.fn(() => ({ query: { id: mockTeam[0].id } }))

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => mockRouter()
}))

describe('Page: Team member with ID', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('Successfull response', () => {
    beforeEach(() => {
      fetchMock.mockResponses(
        [JSON.stringify(mockMe), { status: 200 }],
        [JSON.stringify(mockTeam), { status: 200 }]
      )
    })

    it('renders', async () => {
      const data = mockTeam[0]
      renderWithProviders(<TeamMemberPage />)

      await waitFor(async () => {
        expect(screen.getByText(data.job_title)).toBeInTheDocument()
      })

      expect(screen.getByText(data.business_unit)).toBeInTheDocument()
      expect(screen.getByText(data.location)).toBeInTheDocument()
      expect(screen.getByText(data.grade)).toBeInTheDocument()
      expect(screen.getByText(data.primary_profession)).toBeInTheDocument()
      expect(screen.getByText(data.function)).toBeInTheDocument()
      expect(screen.getByText(data.contract_type)).toBeInTheDocument()
      expect(
        screen.getByText(
          'Legal, Medical, Occupational psychology, Operational delivery, Operational research, Another profession'
        )
      ).toBeInTheDocument()
    })
  })

  it('renders other fields', async () => {
    const data = mockTeam[1]

    mockRouter.mockImplementation(() => ({ query: { id: data.id } }))
    fetchMock.mockResponses(
      [JSON.stringify(mockMe), { status: 200 }],
      [JSON.stringify(mockTeam), { status: 200 }]
    )

    renderWithProviders(<TeamMemberPage />)

    await waitFor(async () => {
      expect(screen.getByText(data.grade_other)).toBeInTheDocument()
    })
    expect(screen.getByText(data.function_other)).toBeInTheDocument()
    expect(screen.getByText(data.profession_other)).toBeInTheDocument()
    expect(screen.getByText(data.contract_type_other)).toBeInTheDocument()
  })

  it('hide primary profession', async () => {
    const data = {
      ...mockTeam[1],
      professions: ['Bunch of professions'],
      primary_profession: 'my primary profession'
    }

    mockRouter.mockImplementation(() => ({ query: { id: data.id } }))
    fetchMock.mockResponses(
      [JSON.stringify(mockMe), { status: 200 }],
      [JSON.stringify([data]), { status: 200 }]
    )

    renderWithProviders(<TeamMemberPage />)

    await waitFor(async () => {
      expect(screen.getByText(data.professions[0])).toBeInTheDocument()
    })
    expect(screen.queryByText(data.primary_profession)).not.toBeInTheDocument()
  })
})
