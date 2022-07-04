import { render } from '@testing-library/react'
import TextFieldControlled from './TextFieldControlled'
import '@testing-library/jest-dom'
import { FormProvider, useForm } from 'react-hook-form'

const Wrapper = ({ children }) => {
  const methods = useForm<{ email: string }>({})
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('TextFieldControlled', () => {
  it('renders', () => {
    const { container } = render(
      <Wrapper>
        <TextFieldControlled
          name="email-field"
          type="email"
          label="Email address"
          placeholder="e.g. Joe.Bloggs@gmail.com"
        />
      </Wrapper>
    )

    const textfield = container.querySelector('input')
    const label = container.querySelector('label')
    expect(textfield).toHaveAttribute('type', 'email')
    expect(textfield).toHaveAttribute('name', 'email-field')
    expect(label).toHaveTextContent('Email address')
  })

  it('validates', () => {
    const { container } = render(
      <Wrapper>
        <TextFieldControlled
          name="email-field"
          type="email"
          label="Email address"
          placeholder="e.g. Joe.Bloggs@gmail.com"
        />
      </Wrapper>
    )

    const textfield = container.querySelector('input')
    const label = container.querySelector('label')
    expect(textfield).toHaveAttribute('type', 'email')
    expect(textfield).toHaveAttribute('name', 'email-field')
    expect(label).toHaveTextContent('Email address')
  })
})
