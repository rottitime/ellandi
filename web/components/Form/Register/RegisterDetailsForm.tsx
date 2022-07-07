import React, { FC } from 'react'
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import FormFooter from '@/components/Form/FormFooter'

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

type Props = {
  onFormSubmit: SubmitHandler<RegisterDetailsType>
}

const RegisterDetailsForm: FC<Props> = ({ onFormSubmit }) => {
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
        <TextFieldControlled name="fullname" label="Full name" />
        <TextFieldControlled name="department" label="Department" />
        <TextFieldControlled name="job" label="Job title" />
        <TextFieldControlled
          name="lineManagerEmail"
          label="Your line manager's email address"
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <>
              <FormControl fullWidth error={!!errors.country}>
                <InputLabel>Country</InputLabel>
                <Select
                  label="Country"
                  margin="none"
                  variant="filled"
                  size="small"
                  {...field}
                >
                  <MenuItem value="UK">United Kingdom</MenuItem>
                </Select>
              </FormControl>

              {errors.country && (
                <FormHelperText error>{errors.country.message}</FormHelperText>
              )}
            </>
          )}
        />

        <FormFooter backUrl="/register/page4" />
      </form>
    </FormProvider>
  )
}

export default RegisterDetailsForm
