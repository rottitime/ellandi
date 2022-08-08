import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FeedbackForm from './FeedbackForm'
import { renderWithProviders } from '@/lib/test-utils'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn()
}))

describe('Page: Sign in', () => {
  const email = 'test@test.com',
    name = 'abc def',
    issue = 'Great site'

  it('renders', () => {
    renderWithProviders(<FeedbackForm onFormSubmit={jest.fn()} loading={false} />)
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument()
    expect(screen.getByTestId('textfield_name')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_email')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_issue')).toBeInTheDocument()
  })

  it('submits', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <FeedbackForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputEmail = screen.getByTestId('textfield_email')
    const inputName = screen.getByTestId('textfield_name')
    const inputIssue = screen.getByTestId('textfield_issue')
    const button = screen.getByRole('button', { name: /Continue/i })

    await userEvent.type(inputEmail, email)
    await userEvent.type(inputName, name)
    await userEvent.type(inputIssue, issue)
    await userEvent.click(button)

    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalledWith({ email, name, issue })
    })
  })
})
