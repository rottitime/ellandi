import { number, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LearningAddType } from '@/service/types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { Alert, styled, Typography } from '@mui/material'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { forwardRef, useImperativeHandle } from 'react'
import { Props, RefHandler } from './types'
import { Field } from '../Field/Field'
import Button from '@/components/UI/Button/Button'
import DatePicker from '@/components/UI/DatePicker/DatePicker'
import Duration from '@/components/Form/Duration/Duration'

const schema: SchemaOf<LearningAddType> = object().shape({
  name: string().required('This is a required field'),
  duration_minutes: number()
    .typeError('you must specify a number')
    .min(1, 'you must specify a number'),
  date_completed: string().nullable().required('Enter a date')
})

const Form = styled('form')`
  &.compact {
    .MuiCardContent-root {
      padding: 0;
    }
  }
`

const LearningAddForm = forwardRef<RefHandler, Props>(
  ({ onFormSubmit, loading, error, defaultValues, compact }, ref) => {
    const methods = useForm<LearningAddType>({
      defaultValues: {
        name: '',
        duration_minutes: null,
        date_completed: null,
        ...defaultValues
      },
      resolver: yupResolver(schema)
    })

    useImperativeHandle(ref, () => ({
      submitForm: () => methods.handleSubmit(onFormSubmit)()
    }))

    return (
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit(onFormSubmit)}
          noValidate
          className={`${compact ? 'compact' : ''}`}
        >
          <AccountCard
            sx={{ mb: 4, maxWidth: 565, p: 0 }}
            header={
              <Typography component="h2">
                <BadgeNumber label="2" sx={{ mr: 2 }} /> Title
              </Typography>
            }
          >
            <TextFieldControlled name="name" label="Enter a title for the learning" />
          </AccountCard>
          <AccountCard
            sx={{ mb: 4, maxWidth: 392 }}
            header={
              <Typography component="h2">
                <BadgeNumber label="3" sx={{ mr: 2 }} /> Duration
              </Typography>
            }
          >
            <Controller
              name="duration_minutes"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <Duration {...field} error={!!error} helperText={error?.message} />
              )}
            />
          </AccountCard>

          <AccountCard
            sx={{ mb: 4, maxWidth: 260 }}
            header={
              <Typography component="h2">
                <BadgeNumber label="4" sx={{ mr: 2 }} /> Date completed
              </Typography>
            }
          >
            <Controller
              name="date_completed"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  disableFuture
                  label="Select date"
                  valueFormat="YYYY-MM-DD"
                  inputFormat="DD/MM/YYYY"
                />
              )}
            />
          </AccountCard>
          {error && (
            <Alert severity="error" sx={{ mb: 4, maxWidth: 700 }}>
              {error}
            </Alert>
          )}
          <Field>
            <Button type="submit" color="primary" loading={loading}>
              Save learning
            </Button>
          </Field>
        </Form>
      </FormProvider>
    )
  }
)

LearningAddForm.displayName = 'LearningAddForm'

export default LearningAddForm
