import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, ref } from 'yup'
import Button from '@/components/UI/Button/Button'
import { Field } from '../Field/Field'
import { FormData, Props } from './types'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const minPassword = 8

const schema: SchemaOf<FormData> = object().shape({
  password: string()
    .min(minPassword, `Password must be ${minPassword} characters or more`)
    .max(20)
    .required('This is a required field'),
  passwordConfirm: string()
    .oneOf([ref('password'), null], 'Does not match with password')
    .required('This is a required field')
})

const SignInForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<FormData>({
    defaultValues: { password: '', passwordConfirm: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Field>
          <TextFieldControlled name="password" label="Password" type="password" />
        </Field>
        <Field>
          <TextFieldControlled
            name="passwordConfirm"
            label="Confirm your password"
            type="password"
          />
        </Field>

        <FooterButtons>
          <Button
            color="primary"
            type="submit"
            loading={loading}
            data-testid="submit-button"
            sx={{ ml: 'auto' }}
          >
            Reset password
          </Button>
        </FooterButtons>
      </form>
    </FormProvider>
  )
}

export default SignInForm
