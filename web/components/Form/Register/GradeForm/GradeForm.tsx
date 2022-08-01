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
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'

const schema: SchemaOf<GradeType> = object().shape({
  grade: string().required('This field is required'),
  grade_other: string().when('grade', (grade) => {
    if (grade === 'other') return string().required('This is a required field')
  })
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

  const methods = useForm<GradeType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isValid }
  } = methods

  const watchGrade = watch('grade')

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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Typography variant="subtitle1" gutterBottom>
          Select your grade. You may only choose one
        </Typography>

        <Typography gutterBottom>
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

        {watchGrade === 'other' && (
          <TextFieldControlled name="grade_other" label="Enter grade" />
        )}

        <FormFooter
          backUrl={backUrl}
          buttonProps={{ loading, disabled: !isDirty && !isValid }}
        />
      </form>
    </FormProvider>
  )
}

export default GradeForm
