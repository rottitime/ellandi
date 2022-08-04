import React, { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import { StandardRegisterProps } from '../types'
import { RegisterDetailsType } from '@/service/api'
import { Field } from '@/components/Form/Field/Field'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const schema: SchemaOf<RegisterDetailsType> = object().shape({
  first_name: string().nullable().required('This field is required'),
  last_name: string().nullable().required('This field is required'),
  job_title: string().nullable().required('This field is required'),
  line_manager_email: string()
    .nullable()
    .email('Email address must be valid')
    .required('This field is required'),
  location: string().nullable().required('This field is required'),
  business_unit: string().nullable().required('This field is required')
})

const RegisterDetailsForm: FC<StandardRegisterProps<RegisterDetailsType>> = (props) => {
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

  return (
    <FormProvider {...methods}>
      <Form {...props}>
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
      </Form>
    </FormProvider>
  )
}

export default RegisterDetailsForm
