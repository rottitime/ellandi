import { screen, waitFor, within } from '@testing-library/react'
import InvitePage from '@/pages/account/invite'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe } from '@/lib/test-utils'
import { InvitedMembers, InviteMember, RegisterUserResponse } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockInviteList: InvitedMembers[] = [
  { email: 'first.user@example.com', first_name: 'Simon', status: 'Pending' }
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
    const newInvite: InvitedMembers = {
      email: 'someonenew@example.com',
      first_name: 'Harry',
      status: 'Pending'
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
    fetchMock.mockResponses(
      [JSON.stringify({}), { status: 200 }],
      [JSON.stringify([...mockInviteList, newInvite]), { status: 200 }]
    )
    userEvent.click(screen.getByTestId('invite-submit'))

    await waitFor(async () => {
      expect(
        within(screen.getByTestId('list-invites')).getByText(newInvite.email)
      ).toBeInTheDocument()
    })
  })
})
