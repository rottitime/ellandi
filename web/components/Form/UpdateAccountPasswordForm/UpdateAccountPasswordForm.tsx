import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { SchemaOf, object } from 'yup'
import TextFieldControlled from '../../UI/TextFieldControlled/TextFieldControlled'
import { Field } from '../Field/Field'
import { schema as defaultSchema, minPassword } from '@/lib/schema'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import useAuth from '@/hooks/useAuth'
import { updatePassword } from '@/service/me'
import { useMutation } from 'react-query'
import { RegisterUserResponse } from '@/service/api'
import Icon from '@/components/Icon/Icon'
import { useState } from 'react'

type UpdateAccountPasswordType = {
  password: string
  newPasswordConfirm: string
  currentPassword: string
}

export const UpdateAccountPasswordForm = ({
  onCancel,
  callback
}: {
  onCancel: () => void
  callback?: () => void
}) => {
  const { authFetch } = useAuth()
  const [done, setDone] = useState(false)

  const schema: SchemaOf<UpdateAccountPasswordType> = object().shape({
    password: defaultSchema.password,
    newPasswordConfirm: defaultSchema.passwordConfirm,
    currentPassword: defaultSchema.requiredField
  })

  const defaultValues = {
    password: '',
    newPasswordConfirm: '',
    currentPassword: ''
  }

  const methods = useForm<UpdateAccountPasswordType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { mutate } = useMutation<
    RegisterUserResponse,
    Error,
    { currentPassword: string; password: string }
  >(async (data) => await authFetch(updatePassword, data), {
    onMutate: () => {
      methods.clearErrors()
    },
    onSuccess: async () => {
      setDone(true)
    },
    onError: (error) => {
      methods.setError('currentPassword', {
        type: 'manual',
        message: error.message
      })
    }
  })

  if (done) {
    return (
      <Box>
        <Box display="flex" mb={4}>
          <Icon icon="tick" />
          <Typography variant="body2" ml={2}>
            You have successfully changed your password
          </Typography>
        </Box>
        <Box justifyContent="flex-end" display="flex">
          <Button onClick={callback} variant="contained" color="primary">
            Finish
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <FormProvider {...methods}>
      <Form
        onCancel={onCancel}
        onFormSubmit={(data: UpdateAccountPasswordType) => {
          mutate({
            password: data.password,
            currentPassword: data.currentPassword
          })
        }}
      >
        <Typography gutterBottom>
          Your password should have at least {minPassword} characters and not include your
          name or email address
        </Typography>

        <Field>
          <TextFieldControlled
            name="currentPassword"
            label="Current password"
            type="password"
          />
        </Field>

        <Field>
          <TextFieldControlled name="password" label="New password" type="password" />
        </Field>
        <Field>
          <TextFieldControlled
            name="newPasswordConfirm"
            label="Confirm new password"
            type="password"
          />
        </Field>
      </Form>
    </FormProvider>
  )
}
