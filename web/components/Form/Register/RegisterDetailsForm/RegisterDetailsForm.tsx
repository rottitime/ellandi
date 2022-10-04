import CreatableAutocomplete from '@/components/Form/CreatableAutocomplete/CreatableAutocomplete'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { FC } from 'react'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import { StandardRegisterProps } from '../types'
import {
  fetchJobTitles,
  GenericDataList,
  Query,
  RegisterDetailsType
} from '@/service/api'
import { Field } from '@/components/Form/Field/Field'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { useQuery } from 'react-query'

const schema: SchemaOf<RegisterDetailsType> = object().shape({
  first_name: string().nullable().required('This is a required field'),
  last_name: string().nullable().required('This is a required field'),
  job_title: string().nullable().required('This is a required field'),
  line_manager_email: string()
    .nullable()
    .email('Email address must be valid')
    .required('This is a required field'),
  location: string().nullable().required('This is a required field'),
  business_unit: string().nullable().required('This is a required field')
})

const RegisterDetailsForm: FC<StandardRegisterProps<RegisterDetailsType>> = (props) => {
  const methods = useForm<RegisterDetailsType>({
    defaultValues: {
      first_name: '',
      last_name: '',
      job_title: '',
      line_manager_email: '',
      location: '',
      business_unit: '',
      ...props.defaultValues
    },
    resolver: yupResolver(schema)
  })

  const { isLoading, data, isSuccess } = useQuery<GenericDataList[], Error>(
    Query.JobTitles,
    fetchJobTitles,
    {
      staleTime: Infinity
    }
  )

  const showField = (field: keyof RegisterDetailsType) => {
    if (!props.pickFields || props.pickFields.includes(field)) {
      return true
    }
    return false
  }

  return (
    <FormProvider {...methods}>
      <Form {...props}>
        {(showField('first_name') || showField('last_name')) && (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Field>
                <TextFieldControlled name="first_name" label="First name" />
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field>
                <TextFieldControlled name="last_name" label="Last name" />
              </Field>
            </Grid>
          </Grid>
        )}
        {/* </Grid> */}

        {showField('job_title') && (
          <Field>
            <Controller
              name="job_title"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <CreatableAutocomplete
                  {...field}
                  loading={isLoading}
                  label="Job title"
                  size="small"
                  options={isSuccess ? data.map(({ name: title }) => ({ title })) : []}
                  error={!!error}
                  helperText={!!error && error.message}
                />
              )}
            />
          </Field>
        )}

        {showField('business_unit') && (
          <Field>
            <TextFieldControlled name="business_unit" label="Business unit" />
          </Field>
        )}
        {showField('location') && (
          <Field>
            <TextFieldControlled name="location" label="Work location" />
          </Field>
        )}
        {showField('line_manager_email') && (
          <Field>
            <TextFieldControlled name="line_manager_email" label="Line manager email" />
          </Field>
        )}
      </Form>
    </FormProvider>
  )
}

export default RegisterDetailsForm
