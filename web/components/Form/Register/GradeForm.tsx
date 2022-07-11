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
import { fetchGrades, GenericDataList } from '@/service/api'
import { useUiContext } from '@/context/UiContext'
import { FC, useEffect } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'

const GradeForm: FC<StandardRegisterProps<null>> = ({ backUrl, onFormSubmit }) => {
  const { handleSubmit } = useForm()
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    'grades',
    fetchGrades,
    { staleTime: Infinity }
  )

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
      <Typography variant="subtitle1" gutterBottom>
        Select your grade. You may only choose one
      </Typography>

      <Typography gutterBottom>
        We'll use this to suggest learning opportunities that are relevant to you
      </Typography>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        aria-live="polite"
        aria-busy={isLoading}
        name="radio-buttons-group"
      >
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

      <FormFooter backUrl={backUrl} />
    </form>
  )
}

export default GradeForm
