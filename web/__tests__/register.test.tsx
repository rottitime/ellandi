import RegisterPage from '@/pages/register/index'
import fetchMock from 'jest-fetch-mock'
import { screen, waitFor, renderWithProviders } from '@/lib/test-utils'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn()
}))

describe('Page: Registration', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('render', async () => {
    renderWithProviders(<RegisterPage />)

    await waitFor(async () => {
      expect(screen.getByText('Create password')).toBeInTheDocument()
    })
  })

  it('clears user token', async () => {
    const token = 'my-token'
    sessionStorage.setItem('token', token)
    expect(sessionStorage.getItem('token')).toEqual(token)
    renderWithProviders(<RegisterPage />)

    expect(sessionStorage.getItem('token')).toEqual(null)
  })
})
