import { number, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LearningAddType } from '@/service/types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { Typography } from '@mui/material'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC, useState } from 'react'
import { Props } from './types'
import { Field } from '../Field/Field'
import Button from '@/components/UI/Button/Button'
import DatePicker from '@/components/UI/DatePicker/DatePicker'
import Duration from '@/components/Form/Duration/Duration'

const schema: SchemaOf<LearningAddType> = object().shape({
  name: string().required('This is a required field'),
  duration: number()
    .typeError('you must specify a number')
    .min(0, 'Min value 0.')
    .max(30, 'Max value 30.'),
  date_completed: string().required('This is a required field')
})

const LearningAddForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<LearningAddType>({
    defaultValues: {
      name: '',
      duration: null,
      date_completed: ''
    },
    resolver: yupResolver(schema)
  })

  const [value, setValue] = useState(2.5)

  return (
    <FormProvider {...methods}>
      <Duration
        //value={2.5}
        onChange={setValue}
        value={value}
      />
      <p>Value: {value}</p>

      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
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
              <BadgeNumber label="3" sx={{ mr: 2 }} /> Duration
            </Typography>
          }
        >
          <TextFieldControlled type="number" name="duration" label="Duration" />
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

        <Field>
          <Button type="submit" variant="contained" loading={loading}>
            Add learning
          </Button>
        </Field>
      </form>
    </FormProvider>
  )
}

export default LearningAddForm
