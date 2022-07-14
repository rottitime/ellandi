import React, { FC, useEffect } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton
} from '@mui/material'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { fetchCountries, GenericDataList } from '@/service/api'
import { useUiContext } from '@/context/UiContext'
import { useQuery } from 'react-query'
import { Field } from '@/components/Form/Field'

export type RegisterDetailsType = {
  fullname: string
  department: string
  job: string
  lineManagerEmail: string
  country: string
}

const schema: SchemaOf<RegisterDetailsType> = object().shape({
  fullname: string().required('This field is required'),
  department: string().required('This field is required'),
  job: string().required('This field is required'),
  lineManagerEmail: string()
    .email('Email address must be valid')
    .required('This field is required'),
  country: string().required('This field is required')
})

const RegisterDetailsForm: FC<StandardRegisterProps<RegisterDetailsType>> = ({
  backUrl,
  onFormSubmit
}) => {
  const { setLoading } = useUiContext()
  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    'countries',
    fetchCountries
  )
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  const methods = useForm<RegisterDetailsType>({
    defaultValues: {
      fullname: '',
      department: '',
      job: '',
      lineManagerEmail: '',
      country: ''
    },
    resolver: yupResolver(schema)
  })
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Field>
          <TextFieldControlled name="fullname" label="Full name" />
        </Field>
        <Field>
          <TextFieldControlled name="department" label="Department" />
        </Field>
        <Field>
          <TextFieldControlled name="job" label="Job title" />
        </Field>
        <Field>
          <TextFieldControlled name="lineManagerEmail" label="Line manager email" />
        </Field>

        <Field>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <>
                <FormControl fullWidth error={!!errors.country} size="small">
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

                {errors.country && (
                  <FormHelperText error>{errors.country.message}</FormHelperText>
                )}
              </>
            )}
          />
        </Field>

        <FormFooter backUrl={backUrl} />
      </form>
    </FormProvider>
  )
}

export default RegisterDetailsForm
