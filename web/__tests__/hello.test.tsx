import { render, screen, waitFor } from '@testing-library/react'
import HelloPage from '@/pages/hello'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Router from 'next/router'
import { renderWithProviders } from '@/lib/test-utils'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn()
}))

describe('HelloPage', () => {
  it('renders', () => {
    render(<HelloPage />)

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /h1\. Heading/i
    })

    expect(heading).toBeInTheDocument()
    expect(screen.getByTestId('button')).toBeInTheDocument()
    expect(screen.getByTestId('route-button')).toBeInTheDocument()
    expect(screen.getByTestId('output')).toBeInTheDocument()
  })
  it('button press', async () => {
    render(<HelloPage />)
    const button = screen.getByTestId('button')

    expect(screen.getByTestId('output')).toBeEmptyDOMElement()

    await userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getByTestId('output')).toHaveTextContent('done')
    })
  })

  it('route spy', async () => {
    renderWithProviders(<HelloPage />)
    const button = screen.getByTestId('route-button')

    await userEvent.click(button)

    await waitFor(async () => {
      expect(Router.push).toHaveBeenCalledTimes(1)
    })
  })
})
