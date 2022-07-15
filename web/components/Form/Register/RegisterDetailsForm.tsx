import React, { FC, useEffect } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton
} from '@mui/material'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import {
  fetchCountries,
  GenericDataList,
  Query,
  RegisterDetailsType
} from '@/service/api'
import { useUiContext } from '@/context/UiContext'
import { useQuery } from 'react-query'
import { Field } from '@/components/Form/Field'

const schema: SchemaOf<RegisterDetailsType> = object().shape({
  first_name: string().required('This field is required'),
  last_name: string().required('This field is required'),
  organisation: string().required('This field is required'),
  job_title: string().required('This field is required'),
  line_manager_email: string()
    .email('Email address must be valid')
    .required('This field is required'),
  location: string().required('This field is required')
})

const RegisterDetailsForm: FC<StandardRegisterProps<RegisterDetailsType>> = ({
  backUrl,
  onFormSubmit,
  loading,
  defaultValues = {
    first_name: '',
    last_name: '',
    organisation: '',
    job_title: '',
    line_manager_email: '',
    location: ''
  }
}) => {
  const { setLoading } = useUiContext()
  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Countries,
    fetchCountries
  )
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  const methods = useForm<RegisterDetailsType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { handleSubmit, control } = methods

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
          <TextFieldControlled name="organisation" label="Department" />
        </Field>
        <Field>
          <TextFieldControlled name="job_title" label="Job title" />
        </Field>
        <Field>
          <TextFieldControlled name="line_manager_email" label="Line manager email" />
        </Field>

        <Field>
          <Controller
            name="location"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <FormControl fullWidth error={!!error} size="small">
                  <InputLabel>Country</InputLabel>

                  {isLoading ? (
                    <Skeleton width={100} sx={{ m: 1 }} />
                  ) : (
                    <Select
                      label="Country"
                      margin="none"
                      variant="outlined"
                      // size="small"
                      {...field}
                    >
                      {data.map(({ name, slug }) => (
                        <MenuItem key={slug} value={slug}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>

                {!!error && <FormHelperText error>{error.message}</FormHelperText>}
              </>
            )}
          />
        </Field>

        <FormFooter backUrl={backUrl} buttonProps={{ loading }} />
      </form>
    </FormProvider>
  )
}

export default RegisterDetailsForm
