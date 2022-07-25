import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { FC } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import {
  fetchPrimaryProfession,
  GenericDataList,
  PrimaryProfessionType,
  Query
} from '@/service/api'
import { useQuery } from 'react-query'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'

const schema: SchemaOf<PrimaryProfessionType> = object().shape({
  profession_primary: string().required()
})

const PrimaryProfessionForm: FC<StandardRegisterProps<PrimaryProfessionType>> = ({
  backUrl,
  onFormSubmit
}) => {
  const methods = useForm<PrimaryProfessionType>({
    defaultValues: { profession_primary: '' },
    resolver: yupResolver(schema)
  })
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid }
  } = methods

  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.PrimaryProfessions,
    fetchPrimaryProfession
  )

  if (isError)
    return (
      <Alert severity="error">
        <AlertTitle>Service Unavailable</AlertTitle>
        Please try again later.
      </Alert>
    )

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
          name="profession_primary"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" aria-busy={isLoading} name="function">
              {isLoading
                ? [...Array(3).keys()].map((i) => (
                    <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
                  ))
                : data.map(({ name, slug }) => (
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
