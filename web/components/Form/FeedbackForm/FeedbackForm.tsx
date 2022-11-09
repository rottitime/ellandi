import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string } from 'yup'
import FormFooter from '../FormFooter'
import { Divider } from '@mui/material'
import { Field } from '../Field/Field'
import { Props } from './types'
import { FeedbackType } from '@/service/types'

const schema: SchemaOf<FeedbackType> = object().shape({
  name: string(),
  email: string().email(
    'Enter an email address in the correct format, like name@example.com'
  ),
  issue: string()
})

const FeedbackForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<FeedbackType>({
    defaultValues: { email: '', name: '', issue: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Divider variant="middle" sx={{ my: 3 }}>
          OR
        </Divider>

        <Field>
          <TextFieldControlled name="name" label="Name" />
        </Field>

        <Field>
          <TextFieldControlled name="email" type="email" label="Email address" />
        </Field>
        <Field>
          <TextFieldControlled name="issue" label="Issue" minRows={3} multiline />
        </Field>

        <FormFooter buttonProps={{ loading, fullWidth: true }} submitText="Continue" />
      </form>
    </FormProvider>
  )
}

export default FeedbackForm
