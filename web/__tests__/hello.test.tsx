import { render, screen } from '@testing-library/react'
import Home from '@/pages/hello'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /h1\. Heading/i
    })

    expect(heading).toBeInTheDocument()
  })
})
