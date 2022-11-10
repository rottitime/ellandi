import CreatableAutocomplete from '@/components/Form/CreatableAutocomplete/CreatableAutocomplete'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { FC } from 'react'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import { StandardRegisterProps } from '../types'
import { RegisterDetailsType, RegisterUserResponse } from '@/service/api'
import { Field } from '@/components/Form/Field/Field'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { useProfile } from '@/hooks/useProfile'
import jobtitles from '@/prefetch/job-titles.json'
import businessUnits from '@/prefetch/business-units.json'

const RegisterDetailsForm: FC<StandardRegisterProps<RegisterDetailsType>> = (props) => {
  const { userProfile } = useProfile<RegisterUserResponse>({})

  const schema: SchemaOf<RegisterDetailsType> = object().shape({
    first_name: string().nullable().required('Enter your first name'),
    last_name: string().nullable().required('Enter your last name'),
    job_title: string().nullable().required('Select your job title'),
    line_manager_email: string()
      .nullable()
      .email('Enter an email address in the correct format, like name@example.com')
      .required("Enter your line manager's email address")
      .not(
        [userProfile?.email],
        "You have entered an email that matches your own. Enter your line manager's email address"
      ),
    location: string().nullable().required('Enter your work location'),
    business_unit: string().nullable().required('Select your business unit')
  })

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

  return (
    <FormProvider {...methods}>
      <Form {...props}>
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

        <Field>
          <Controller
            name="job_title"
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <CreatableAutocomplete
                {...field}
                label="Job title"
                size="small"
                options={jobtitles.map(({ name: title }) => ({ title }))}
                error={!!error}
                helperText={!!error && error.message}
              />
            )}
          />
        </Field>

        <Field>
          <Controller
            name="business_unit"
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <CreatableAutocomplete
                {...field}
                label="Business unit"
                size="small"
                options={businessUnits.map(({ name: title }) => ({ title }))}
                error={!!error}
                helperText={!!error && error.message}
              />
            )}
          />
        </Field>

        <Field>
          <TextFieldControlled name="location" label="Work location" />
        </Field>

        <Field>
          <TextFieldControlled
            name="line_manager_email"
            label="Line manager email address"
          />
        </Field>
      </Form>
    </FormProvider>
  )
}

export default RegisterDetailsForm
