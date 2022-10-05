import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, ref } from 'yup'
import Button from '@/components/UI/Button/Button'
import { Field } from '../Field/Field'
import { FormData, Props } from './types'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'

const minPassword = 8

const schema: SchemaOf<FormData> = object().shape({
  new_password: string()
    .min(minPassword, `Password must be ${minPassword} characters or more`)
    .required('This is a required field'),
  new_password_confirm: string()
    .oneOf([ref('new_password'), null], 'Does not match with password')
    .required('This is a required field')
})

const SignInForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<FormData>({
    defaultValues: { new_password: '', new_password_confirm: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Field>
          <TextFieldControlled
            name="new_password"
            label="Enter new password"
            type="password"
          />
        </Field>
        <Field>
          <TextFieldControlled
            name="new_password_confirm"
            label="Confirm new password"
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
