import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FC } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'

type PrimaryProfessionType = {
  primaryProfession: string
}

const schema: SchemaOf<PrimaryProfessionType> = object().shape({
  primaryProfession: string().required()
})

/* TODO: Replace with api data */
const isLoading = false
const data = [
  { name: 'Corporate Finance Profession', slug: 'Corporate Finance Profession' },
  {
    name: 'Counter-fraud Standards and Profession',
    slug: 'Counter-fraud Standards and Profession'
  },
  {
    name: 'Digital, Data and Technology Professions',
    slug: 'Digital, Data and Technology Professions'
  }
]

const PrimaryProfessionForm: FC<StandardRegisterProps<PrimaryProfessionType>> = ({
  backUrl,
  onFormSubmit
}) => {
  const methods = useForm<PrimaryProfessionType>({
    defaultValues: { primaryProfession: '' },
    resolver: yupResolver(schema)
  })
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid }
  } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Typography variant="h3" gutterBottom>
          Select your main profession. You may only choose one
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        <Controller
          name="primaryProfession"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" aria-busy={isLoading} name="function">
              {data.map(({ name, slug }) => (
                <FormControlLabel
                  key={slug}
                  {...field}
                  control={<Radio />}
                  label={name}
                  value={slug}
                />
              ))}
            </RadioGroup>
          )}
        />

        <FormFooter
          backUrl={backUrl}
          buttonProps={{
            disabled: !isDirty && !isValid
          }}
        />
      </form>
    </FormProvider>
  )
}

export default PrimaryProfessionForm
