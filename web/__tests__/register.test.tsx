import { screen, waitFor } from '@testing-library/react'
import RegisterPage from '@/pages/register/index'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'

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
})
