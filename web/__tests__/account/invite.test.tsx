import { screen, waitFor, within } from '@testing-library/react'
import InvitePage from '@/pages/account/invite'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe } from '@/lib/test-utils'
import { InvitedMembers, InviteMember, RegisterUserResponse } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockInviteList: InvitedMembers[] = [
  { email: 'test@example.com', first_name: 'Simon', status: 'Pending' }
]

describe('Page: Profile', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponses([JSON.stringify(mockInviteList), { status: 200 }])
    renderWithProviders(<InvitePage />)

    expect(screen.getByTestId('invite-form')).toBeInTheDocument()

    await waitFor(async () => {
      expect(screen.getByTestId('list-invites')).toBeInTheDocument()
    })

    expect(screen.getByText(mockInviteList[0].email)).toBeInTheDocument()
  })

  it('new invites are added to list', async () => {
    const newInvite: InviteMember = {
      email: 'someonenew@example.com',
      first_name: 'John'
    }

    fetchMock.mockResponse(JSON.stringify(mockInviteList), { status: 200 })
    renderWithProviders(<InvitePage />)

    await waitFor(async () => {
      expect(screen.getByText(mockInviteList[0].email)).toBeInTheDocument()
    })

    const currentList = screen.getByTestId('list-invites')
    expect(within(currentList).queryByText(newInvite.email)).not.toBeInTheDocument()

    await userEvent.type(screen.getByTestId('textfield_email'), newInvite.email)
    await userEvent.type(screen.getByTestId('textfield_first_name'), newInvite.first_name)

    fetchMock.mockResponse(JSON.stringify([...mockInviteList]), { status: 200 })

    // await waitFor(async () => {
    //   expect(within(currentList).getByText(newInvite.email)).toBeInTheDocument()
    // })
  })

  describe('Form', () => {})

  // describe('Successfull response', () => {
  //   beforeEach(() => {
  //     fetchMock.mockResponses([JSON.stringify(mockMe), { status: 200 }])
  //   })

  //   it('renders', async () => {
  //     renderWithProviders(<InvitePage />)

  //     await waitFor(async () => {
  //       expect(screen.getByText(mockMe.email)).toBeInTheDocument()
  //     })

  //     expect(
  //       screen.getByText(`${mockMe.first_name} ${mockMe.last_name}`)
  //     ).toBeInTheDocument()

  //     expect(screen.getByText(mockMe.job_title)).toBeInTheDocument()
  //     expect(screen.getByText(mockMe.business_unit)).toBeInTheDocument()
  //     expect(screen.getByText(mockMe.business_unit)).toBeInTheDocument()
  //     expect(screen.getByText(mockMe.line_manager_email)).toBeInTheDocument()
  //     expect(screen.getByText(mockMe.line_manager_email)).toBeInTheDocument()
  //     expect(screen.getByText(mockMe.grade)).toBeInTheDocument()
  //     expect(screen.getByText(mockMe.function)).toBeInTheDocument()
  //     expect(screen.getByText(mockMe.contract_type)).toBeInTheDocument()
  //     expect(screen.getByText('Audit, Management')).toBeInTheDocument()
  //   })

  // it("hides 'primary profession' from proffession list", async () => {
  //   fetchMock.mockResponses([
  //     JSON.stringify({
  //       ...mockMe,
  //       professions: ['Audit', 'Train spotting', 'Management'],
  //       primary_profession: 'Train spotting'
  //     }),
  //     { status: 200 }
  //   ])

  //   renderWithProviders(<InvitePage />)
  //   await waitFor(async () => {
  //     expect(screen.getByText('Audit, Management')).toBeInTheDocument()
  //   })
  // })

  // it('renders other fields', async () => {
  //   const data: RegisterUserResponse = {
  //     ...mockMe,
  //     professions: ['Chosen profession', 'Other'],
  //     profession_other: 'Custom other profession',
  //     grade_other: 'Custom other grade',
  //     function_other: 'Custom other function',
  //     contract_type_other: 'custom other contract'
  //   }

  //   fetchMock.mockResponse(JSON.stringify(data), { status: 200 })

  //   renderWithProviders(<InvitePage />)

  //   await waitFor(async () => {
  //     expect(screen.getByText(data.grade_other)).toBeInTheDocument()
  //   })
  //   expect(screen.getByText(data.function_other)).toBeInTheDocument()
  //   expect(screen.getByText(data.contract_type_other)).toBeInTheDocument()
  //   expect(
  //     screen.getByText('Chosen profession, Custom other profession')
  //   ).toBeInTheDocument()
  // })
})
