import { render, screen } from '@testing-library/react'
import Page from '@/pages/register/page3'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    const { container, debug } = render(<Page />)

    // const button = container.querySelector('input[type=submit]')
    // expect(button).toBeInTheDocument()

    debug()

    // const heading = screen.getByRole('heading', {
    //   level: 1,
    //   name: /h1\. Heading/i
    // })

    // expect(heading).toBeInTheDocument()
  })
})
