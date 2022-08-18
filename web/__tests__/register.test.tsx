import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterStepPage from '@/pages/register/step/[step]'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn()
}))

//TODO: Test the steps page
describe.skip('Page: Registration steps', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('render', async () => {
    renderWithProviders(
      <RegisterStepPage
        stepInt={0}
        nextUrl=""
        title="test"
        backUrl=""
        progress={0}
        skip={true}
      />
    )

    await waitFor(async () => {
      expect(screen.getByText('Create a password')).toBeInTheDocument()
    })
  })
})
