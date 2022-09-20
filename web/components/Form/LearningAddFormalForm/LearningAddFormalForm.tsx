import { boolean, number, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LearningAddFormalType } from '@/service/types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Typography
} from '@mui/material'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { Props } from './types'
import { Field } from '../Field/Field'
import Button from '@/components/UI/Button/Button'
import DatePicker from '@/components/UI/DatePicker/DatePicker'
import Duration from '@/components/Form/Duration/Duration'

const schema: SchemaOf<LearningAddFormalType> = object().shape({
  name: string().required('This is a required field'),
  cost: number().typeError('you must specify a number'),
  cost_unknown: boolean().oneOf([true], 'You must accept the privacy policy'),
  duration: number()
    .typeError('you must specify a number')
    .min(0, 'Min value 0.')
    .max(30, 'Max value 30.'),
  date_completed: string().required('This is a required field')
})

const LearningAddFormalForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<LearningAddFormalType>({
    defaultValues: {
      name: '',
      cost: null,
      cost_unknown: null,
      duration: null,
      date_completed: ''
    },
    resolver: yupResolver(schema)
  })

  const { control, handleSubmit, watch } = methods
  const watchCosts = watch(['cost', 'cost_unknown'])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <AccountCard
          sx={{ mb: 4, maxWidth: 565 }}
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
              <BadgeNumber label="3" sx={{ mr: 2 }} /> Course cost
            </Typography>
          }
        >
          {/* <Controller
            name="duration"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Duration {...field} error={!!error} helperText={error?.message} />
            )}
          /> */}

          <TextFieldControlled
            type="number"
            inputProps={{ pattern: '^$d{1,3}(,d{3})*(.d+)?$' }}
            name="cost"
            disabled={!!watchCosts[1]}
            label="Cost"
            InputProps={{
              startAdornment: <InputAdornment position="start">&pound;</InputAdornment>
            }}
          />
          <Controller
            name="cost_unknown"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox {...field} checked={!!field.value} value={!!field.value} />
                  }
                  label="Unknown"
                />
                {error && <FormHelperText error>{error.message}</FormHelperText>}
              </>
            )}
          />
        </AccountCard>

        <AccountCard
          sx={{ mb: 4, maxWidth: 392 }}
          header={
            <Typography component="h2">
              <BadgeNumber label="4" sx={{ mr: 2 }} /> Duration
            </Typography>
          }
        >
          <Controller
            name="duration"
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
              <BadgeNumber label="5" sx={{ mr: 2 }} /> Date completed
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

        <Field>
          <Button type="submit" variant="contained" loading={loading}>
            Add learning
          </Button>
        </Field>
      </form>
    </FormProvider>
  )
}

export default LearningAddFormalForm
