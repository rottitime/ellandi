import { boolean, number, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LearningFormalType, LearningBaseType, MeLearningRecord } from '@/service/types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  styled,
  Typography
} from '@mui/material'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { forwardRef, useImperativeHandle } from 'react'
import { Props, RefHandler } from './types'
import { Field } from '../Field/Field'
import Button from '@/components/UI/Button/Button'
import DatePicker from '@/components/UI/DatePicker/DatePicker'
import Duration from '@/components/Form/Duration/Duration'

const schema: SchemaOf<LearningBaseType> = object().shape({
  name: string().required('This is a required field'),
  duration_minutes: number()
    .typeError('you must specify a number')
    .min(1, 'you must specify a number'),
  date_completed: string().nullable().required('Enter a date')
})

const schemaFormal: SchemaOf<LearningFormalType> = schema.shape({
  cost_pounds: number()
    .nullable()
    .when('cost_unknown', (costUnknown) => {
      if (!costUnknown)
        return number()
          .min(0, 'Min value 0.')
          .required('This is a required field')
          .typeError('you must specify a number')
    }),
  cost_unknown: boolean().nullable()
})

const Form = styled('form')`
  &.compact {
    .MuiCardContent-root {
      padding: 0;
    }
  }
`

const LearningAddForm = forwardRef<RefHandler, Props>(
  ({ onFormSubmit, loading, error, defaultValues, compact, type = 'generic' }, ref) => {
    const initialValues = {
      name: '',
      duration_minutes: null,
      date_completed: null,
      cost_pounds: null,
      cost_unknown: false,
      ...defaultValues
    }

    if (type === 'generic') {
      delete initialValues.cost_pounds
      delete initialValues.cost_unknown
    }

    const methods = useForm<Partial<MeLearningRecord>>({
      defaultValues: initialValues,
      resolver: yupResolver(type === 'generic' ? schema : schemaFormal)
    })
    const { control, handleSubmit, setValue } = methods

    useImperativeHandle(ref, () => ({
      submitForm: () => handleSubmit(onFormSubmit)()
    }))

    return (
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(onFormSubmit)}
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

          {type === 'formal' && (
            <>
              {' '}
              <AccountCard
                sx={{ mb: 4, maxWidth: 392 }}
                header={
                  <Typography component="h2">
                    <BadgeNumber label="3" sx={{ mr: 2 }} /> Course cost
                  </Typography>
                }
              >
                <TextFieldControlled
                  type="number"
                  name="cost_pounds"
                  label="Cost"
                  onKeyDown={(e) =>
                    (e.key === 'e' || e.key === '-') && e.preventDefault()
                  }
                  onChange={() => setValue('cost_unknown', false)}
                  inputProps={{ min: 0, 'data-testid': 'cost-field' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&pound;</InputAdornment>
                    )
                  }}
                />
                <Controller
                  name="cost_unknown"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={!!field.value}
                            value={!!field.value}
                            onChange={(e) => {
                              setValue('cost_pounds', null)
                              setValue(field.name, (e.target as HTMLInputElement).checked)
                            }}
                          />
                        }
                        label="Unknown"
                      />
                      {error && <FormHelperText error>{error.message}</FormHelperText>}
                    </>
                  )}
                />
              </AccountCard>
            </>
          )}

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
              control={control}
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
              control={control}
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

          {!compact && (
            <Field>
              <Button type="submit" color="primary" loading={loading}>
                Save learning
              </Button>
            </Field>
          )}
        </Form>
      </FormProvider>
    )
  }
)

LearningAddForm.displayName = 'LearningAddForm'

export default LearningAddForm
