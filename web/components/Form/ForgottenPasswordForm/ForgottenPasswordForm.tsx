import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string } from 'yup'
import Button from '@/components/UI/Button/Button'
import { Field } from '../Field/Field'
import { FormData, Props } from './types'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const schema: SchemaOf<FormData> = object().shape({
  email: string()
    .email('Enter an email address in the correct format, like name@example.com')
    .required('This is a required field')
})

const SignInForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<FormData>({
    defaultValues: { email: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Field>
          <TextFieldControlled
            name="email"
            type="email"
            label="Email address"
            placeholder="e.g. Joe.Bloggs@gmail.com"
          />
        </Field>

        <FooterButtons>
          <Button color="tertiary" href={urls.signin} size="small">
            Back
          </Button>
          <Button
            color="primary"
            type="submit"
            loading={loading}
            data-testid="submit-button"
          >
            Send
          </Button>
        </FooterButtons>
      </form>
    </FormProvider>
  )
}

export default SignInForm
