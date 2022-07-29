import {
  // Alert,
  // AlertTitle,
  // FormControlLabel,
  // Radio,
  // RadioGroup,
  Typography
} from '@mui/material'
import { FC } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import {
  // fetchPrimaryProfession,
  // GenericDataList,
  PrimaryProfessionType,
  ProfessionType
} from '@/service/api'
// import { useQuery } from 'react-query'
// import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'

const schema: SchemaOf<PrimaryProfessionType> = object().shape({
  primary_profession: string().required()
})

const PrimaryProfessionForm: FC<
  StandardRegisterProps<PrimaryProfessionType, ProfessionType>
> = ({ defaultValues = { primary_profession: '' }, backUrl, skipUrl, onFormSubmit }) => {
  const methods = useForm<PrimaryProfessionType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const {
    handleSubmit,
    // control,
    formState: { isDirty, isValid }
  } = methods

  // if (!(defaultValues.professions || []).length) skip()

  // const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
  //   Query.PrimaryProfessions,
  //   fetchPrimaryProfession
  // )

  // if (isError)
  //   return (
  //     <Alert severity="error">
  //       <AlertTitle>Service Unavailable</AlertTitle>
  //       Please try again later.
  //     </Alert>
  //   )

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Typography variant="subtitle1" gutterBottom>
          Select your main profession. You may only choose one
        </Typography>

        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        {/* <Controller
          name="primary_profession"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" name="primary_profession" {...field}>
              {defaultValues.professions.map((name) => (
                <FormControlLabel
                  key={name}
                  control={<Radio />}
                  label={name}
                  value={name}
                />
              ))}
            </RadioGroup>
          )}
        /> */}

        <FormFooter
          backUrl={backUrl}
          skipUrl={skipUrl}
          buttonProps={{
            disabled: !isDirty && !isValid
          }}
        />
      </form>
    </FormProvider>
  )
}

export default PrimaryProfessionForm
