import { Alert, AlertTitle, Skeleton, Stack, styled, Typography } from '@mui/material'
import ToggleChip from '@/components/ToggleChip'
import { fetchProfessions } from '@/service/api'
import { GenericDataList } from '@/service/types'
import { useUiContext } from '@/context/UiContext'
import { useQuery } from 'react-query'
import { FC, useEffect, useState } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'

const List = styled(Stack)`
  .MuiChip-root {
    margin: 3px;
  }
`

const ProfessionForm: FC<StandardRegisterProps<null>> = ({ backUrl, onFormSubmit }) => {
  const [profession, setProfession] = useState<string[]>([])
  const { handleSubmit } = useForm()
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    'professions',
    fetchProfessions
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
        Select the Profession(s) that you belong to. You may choose more than one
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        We'll use this to suggest learning opportunities that are relevant to you
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
          : data.map(({ name, slug }) => (
              <ToggleChip
                key={slug}
                label={name}
                onToggle={(_e, active) => {
                  setProfession((p) =>
                    active ? [...p, name] : p.filter((item) => item !== name)
                  )
                }}
              />
            ))}
      </List>

      <FormFooter backUrl={backUrl} buttonProps={{ disabled: !profession.length }} />
    </form>
  )
}

export default ProfessionForm
