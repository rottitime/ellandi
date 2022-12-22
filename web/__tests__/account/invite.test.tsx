import { screen, waitFor, within } from '@testing-library/react'
import InvitePage from '@/pages/account/invite'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import { InvitedMembers } from '@/service/types'
import userEvent from '@testing-library/user-event'

const mockInviteList: InvitedMembers[] = [
  { email: 'first.user@example.com', first_name: 'Simon', status: 'Pending' }
]

describe('Page: Invite Members', () => {
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

    expect(
      within(screen.getByTestId('list-invites')).getByText(mockInviteList[0].email, {
        exact: false
      })
    ).toBeInTheDocument()
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
      expect(
        screen.getByText(mockInviteList[0].email, { exact: false })
      ).toBeInTheDocument()
    })

    const currentList = screen.getByTestId('list-invites')
    expect(within(currentList).queryByText(newInvite.email)).not.toBeInTheDocument()

    await userEvent.type(screen.getByTestId('textfield_members.0.email'), newInvite.email)
    await userEvent.type(
      screen.getByTestId('textfield_members.0.first_name'),
      newInvite.first_name
    )
    fetchMock.mockResponses(
      [JSON.stringify({}), { status: 200 }],
      [JSON.stringify([...mockInviteList, newInvite]), { status: 200 }]
    )
    userEvent.click(screen.getByTestId('invite-submit'))

    await waitFor(async () => {
      expect(
        within(screen.getByTestId('list-invites')).getByText(newInvite.email, {
          exact: false
        })
      ).toBeInTheDocument()
    })

    //check textfields are cleared
    expect(screen.getByTestId('textfield_members.0.email')).toHaveValue('')
    expect(screen.getByTestId('textfield_members.0.first_name')).toHaveValue('')
  })

  it('shows error on form submit', async () => {
    const errorMessage = 'Some kind of Error happened here'
    const newInvite: InvitedMembers = {
      email: 'someonenew@example.com',
      first_name: 'Harry',
      status: 'Pending'
    }

    fetchMock.mockResponse(JSON.stringify(mockInviteList), { status: 200 })

    renderWithProviders(<InvitePage />)

    await userEvent.type(screen.getByTestId('textfield_members.0.email'), newInvite.email)
    await userEvent.type(
      screen.getByTestId('textfield_members.0.first_name'),
      newInvite.first_name
    )
    fetchMock.mockResponses(
      [JSON.stringify({ detail: errorMessage }), { status: 401 }],
      [JSON.stringify([...mockInviteList, newInvite]), { status: 200 }]
    )

    userEvent.click(screen.getByTestId('invite-submit'))

    await waitFor(async () => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage)

    expect(
      within(screen.getByTestId('list-invites')).queryByText(newInvite.email)
    ).not.toBeInTheDocument()
  })
})
