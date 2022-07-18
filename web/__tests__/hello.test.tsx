import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/pages/hello'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Router from 'next/router'
import { renderWithProviders, renderWithProviders2 } from '@/lib/test-utils'

jest.mock('next/router', () => ({ push: jest.fn() }))

describe('Home', () => {
  it('renders', () => {
    render(<Home />)

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
    render(<Home />)
    const button = screen.getByTestId('button')

    expect(screen.getByTestId('output')).toBeEmptyDOMElement()

    userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getByTestId('output')).toHaveTextContent('done')
    })
  })

  it('route spy', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires

    renderWithProviders(<Home />)
    const button = screen.getByTestId('route-button')

    userEvent.click(button)

    await waitFor(async () => {
      expect(Router.push).toHaveBeenCalledTimes(1)
    })
  })
})
