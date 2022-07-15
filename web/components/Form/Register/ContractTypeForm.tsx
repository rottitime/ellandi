import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { GenericDataList, Query } from '@/service/types'
import { useQuery } from 'react-query'
import { fetchContractTypes } from '@/service/api'
import { FC, useEffect } from 'react'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { useForm } from 'react-hook-form'
import { StandardRegisterProps } from './types'
import FormFooter from '@/components/Form/FormFooter'

const ContractTypeForm: FC<StandardRegisterProps<null>> = ({ onFormSubmit, backUrl }) => {
  const { handleSubmit } = useForm()
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.ContractTypes,
    fetchContractTypes
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
      <Typography variant="h3" gutterBottom>
        Select your current contract type. You can only choose one
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        We'll use this to suggest learning opportunities that are relevant to you
      </Typography>

      <RadioGroup>
        {isLoading
          ? [...Array(4).keys()].map((i) => (
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

export default ContractTypeForm
