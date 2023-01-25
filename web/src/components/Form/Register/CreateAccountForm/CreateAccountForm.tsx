import { FC, useCallback, useEffect } from 'react'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography
} from '@mui/material'
import { object, SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { StandardRegisterProps } from '@/components/Form/Register/types'
import { Field } from '@/components/Form/Field/Field'
import { CreateAccountType } from './types'
import useAuth from '@/hooks/useAuth'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import Link from '@/components/UI/Link'
import getConfig from 'next/config'
import { schema as defaultSchema, minPassword } from '@/lib/schema'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const defaultValues = {
  email: '',
  password: '',
  emailConfirm: '',
  passwordConfirm: '',
  privacy_policy_agreement: false
}

const schema: SchemaOf<CreateAccountType> = object().shape({
  email: defaultSchema.email,
  emailConfirm: defaultSchema.emailConfirm,
  password: defaultSchema.password,
  passwordConfirm: defaultSchema.passwordConfirm,
  privacy_policy_agreement: defaultSchema.privacyPolicyAgreement
})

const CreateAccountForm: FC<StandardRegisterProps<CreateAccountType>> = (props) => {
  const { logout, hasToken, invalidate } = useAuth()

  const forceLogout = useCallback(() => {
    hasToken() && logout()
    invalidate()
  }, [hasToken, invalidate, logout])

  useEffect(() => {
    forceLogout()
  }, [forceLogout])

  const methods = useForm<CreateAccountType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <Form
        {...props}
        defaultValues={defaultValues}
        submitDisabled
        autoComplete="off"
        method="POST"
      >
        <Typography gutterBottom>
          You need to create an account before using this service. Already have an
          account? <Link href={urls.signin}>Sign in</Link>
        </Typography>

        <Typography gutterBottom>Email address</Typography>
        <Field>
          <TextFieldControlled name="email" label="Email address" />
        </Field>
        <Field>
          <TextFieldControlled name="emailConfirm" label="Confirm your email address" />
        </Field>

        <Typography gutterBottom>Create password</Typography>

        <Typography variant="body2" gutterBottom>
          Your password should have at least {minPassword} characters and not include your
          name or email address
        </Typography>

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

        <Typography variant="body2" gutterBottom>
          <Link href="/help/privacy-policy" target="_tab">
            Privacy policy (opens in a new tab)
          </Link>
        </Typography>

        <FormGroup>
          <Controller
            name="privacy_policy_agreement"
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      data-testid="privacy-checkbox"
                      checked={field.value}
                      {...field}
                    />
                  }
                  label="I agree to the privacy policy"
                />
                {error && <FormHelperText error>{error.message}</FormHelperText>}
              </>
            )}
          />
        </FormGroup>
      </Form>
    </FormProvider>
  )
}

export default CreateAccountForm
