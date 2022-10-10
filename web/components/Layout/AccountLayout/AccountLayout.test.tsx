import AccountLayout from './AccountLayout'
import fetchMock from 'jest-fetch-mock'
import {
  bugfixForTimeout,
  renderWithProviders,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  mockMe
} from '@/lib/test-utils'

import userEvent from '@testing-library/user-event'
import router from 'next/router'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  replace: jest.fn()
}))

describe('AccountLayout', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponse(JSON.stringify(mockMe), { status: 200 })
    renderWithProviders(
      <AccountLayout>
        <p>my page</p>
      </AccountLayout>
    )

    await waitFor(async () => {
      expect(screen.getByText('my page')).toBeInTheDocument()
    })
  })

  describe('Unauthorised', () => {
    const redirectParams = {
      pathname: 'signin',
      query: { ecode: 3 }
    }

    it('redirects unuathenticated', async () => {
      fetchMock.mockResponse(JSON.stringify(mockMe), { status: 401 })

      await renderWithProviders(
        <AccountLayout>
          <p>my page</p>
        </AccountLayout>
      )

      await waitFor(async () =>
        expect(router.replace).toHaveBeenCalledWith(redirectParams)
      )
    })
  })
})
