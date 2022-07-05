import { render, screen } from '@testing-library/react'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FormProvider, useForm } from 'react-hook-form'

const Wrapper = ({ children }) => {
  const methods = useForm<{ email: string }>({})
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('TextFieldControlled', () => {
  it('renders', () => {
    render(
      <Wrapper>
        <TextFieldControlled
          name="email-field"
          type="email"
          label="Email address"
          placeholder="e.g. Joe.Bloggs@gmail.com"
        />
      </Wrapper>
    )

    const textfield = screen.getByRole('textbox', { name: /Email address/i })
    expect(textfield).toBeInTheDocument()
  })

  it('validates', () => {
    render(
      <Wrapper>
        <TextFieldControlled
          name="email-field"
          type="email"
          label="Email address"
          placeholder="e.g. Joe.Bloggs@gmail.com"
        />
      </Wrapper>
    )

    const textfield = screen.getByRole('textbox', { name: 'Email address' })
    const label = screen.getByLabelText('Email address')
    expect(textfield).toHaveAttribute('type', 'email')
    expect(textfield).toHaveAttribute('name', 'email-field')
    expect(label).toBeInTheDocument()
  })
})
