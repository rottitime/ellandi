import { Alert, AlertTitle, Skeleton, Stack, styled, Typography } from '@mui/material'
import ToggleChip from '@/components/ToggleChip'
import { fetchProfessions } from '@/service/api'
import { GenericDataList } from '@/service/types'
import { useUiContext } from '@/context/UiContext'
import { useQuery } from 'react-query'
import { FC, useEffect } from 'react'
import FormFooter from '../FormFooter'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'

const List = styled(Stack)`
  .MuiChip-root {
    margin: 3px;
  }
`

const ProfessionForm: FC<StandardRegisterProps<null>> = ({ onFormSubmit }) => {
  const { handleSubmit } = useForm()
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    'professions',
    fetchProfessions,
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
        Select the Profession(s) that you belong to. You may choose more than one
      </Typography>

      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <List
        direction="row"
        flexWrap="wrap"
        spacing={0}
        justifyContent="center"
        aria-live="polite"
        aria-busy={isLoading}
      >
        {isLoading
          ? [...Array(22).keys()].map((i) => (
              <Skeleton key={i} width={100} sx={{ m: 1 }} />
            ))
          : data.map(({ name, slug }) => <ToggleChip key={slug} label={name} />)}
      </List>

      <FormFooter backUrl="/register/page6" />
    </form>
  )
}

export default ProfessionForm
