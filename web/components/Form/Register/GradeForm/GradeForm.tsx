import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useQuery } from 'react-query'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { fetchGrades, GenericDataList, GradeType, Query } from '@/service/api'
import { useUiContext } from '@/context/UiContext'
import { FC, useEffect } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from '../types'
import { Controller, useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema: SchemaOf<GradeType> = object().shape({
  grade: string().required('This field is required')
})

const GradeForm: FC<StandardRegisterProps<GradeType>> = ({
  backUrl,
  onFormSubmit,
  loading,
  defaultValues = {
    grade: ''
  }
}) => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Grades,
    fetchGrades
  )

  const { control, handleSubmit } = useForm<GradeType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  if (isError)
    return (
      <Alert severity="error">
        <AlertTitle>Service Unavailable</AlertTitle>
        Please try again later.
      </Alert>
    )

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography variant="h3" gutterBottom>
        Select your grade. You may only choose one
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        We'll use this to suggest learning opportunities that are relevant to you
      </Typography>

      <Controller
        name="grade"
        control={control}
        render={({ field }) => (
          <RadioGroup aria-live="polite" aria-busy={isLoading} {...field}>
            {isLoading
              ? [...Array(5).keys()].map((i) => (
                  <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
                ))
              : data.map(({ name, slug }) => (
                  <FormControlLabel
                    key={slug}
                    control={<Radio />}
                    label={name}
                    value={slug}
                  />
                ))}
          </RadioGroup>
        )}
      />

      <FormFooter backUrl={backUrl} buttonProps={{ loading }} />
    </form>
  )
}

export default GradeForm
