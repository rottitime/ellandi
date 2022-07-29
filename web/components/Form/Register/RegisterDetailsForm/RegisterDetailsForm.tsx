import React, { FC, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from '../types'
import { RegisterDetailsType } from '@/service/api'
import { Field } from '@/components/Form/Field'

const schema: SchemaOf<RegisterDetailsType> = object().shape({
  first_name: string().required('This field is required'),
  last_name: string().required('This field is required'),
  job_title: string().required('This field is required'),
  line_manager_email: string()
    .email('Email address must be valid')
    .required('This field is required'),
  location: string().required('This field is required'),
  business_unit: string().required('This field is required')
})

const RegisterDetailsForm: FC<StandardRegisterProps<RegisterDetailsType>> = ({
  backUrl,
  skipUrl,
  onFormSubmit,
  loading,
  defaultValues
}) => {
  const methods = useForm<RegisterDetailsType>({
    defaultValues: {
      first_name: '',
      last_name: '',
      job_title: '',
      line_manager_email: '',
      location: '',
      business_unit: ''
    },
    resolver: yupResolver(schema)
  })
  const { handleSubmit, reset } = methods

  console.log(1, { defaultValues })

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextFieldControlled name="first_name" label="First name" />
          </Grid>
          <Grid item xs={6}>
            <Field>
              <TextFieldControlled name="last_name" label="Last name" />
            </Field>
          </Grid>
        </Grid>

        <Field>
          <TextFieldControlled name="job_title" label="Job title" />
        </Field>

        <Field>
          <TextFieldControlled name="business_unit" label="Business unit" />
        </Field>

        <Field>
          <TextFieldControlled name="location" label="Work location" />
        </Field>

        <Field>
          <TextFieldControlled name="line_manager_email" label="Line manager email" />
        </Field>

        <FormFooter skipUrl={skipUrl} backUrl={backUrl} buttonProps={{ loading }} />
      </form>
    </FormProvider>
  )
}

export default RegisterDetailsForm
