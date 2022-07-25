import { Alert, AlertTitle, Skeleton, Stack, styled, Typography } from '@mui/material'
import ToggleChip from '@/components/ToggleChip'
import { fetchProfessions } from '@/service/api'
import { GenericDataList, ProfessionType, Query } from '@/service/types'
import { useUiContext } from '@/context/UiContext'
import { useQuery } from 'react-query'
import { FC, useEffect } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const List = styled(Stack)`
  .MuiChip-root {
    margin: 3px;
  }
`

const fieldName: keyof ProfessionType = 'professions'

const schema: SchemaOf<ProfessionType> = object().shape({
  professions: array().of(string()).min(1, 'This is a required field')
})

const ProfessionForm: FC<StandardRegisterProps<ProfessionType>> = ({
  backUrl,
  onFormSubmit,
  loading,
  defaultValues = {
    professions: []
  }
}) => {
  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    trigger,
    formState: { isDirty, isValid }
  } = useForm<ProfessionType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Professions,
    fetchProfessions
  )
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  register(fieldName)

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
                active={getValues(fieldName).includes(name)}
                label={name}
                onToggle={async () => {
                  const data = getValues(fieldName)

                  setValue(
                    fieldName,
                    data?.includes(name)
                      ? data.filter((item) => item !== name)
                      : [...data, name]
                  )

                  await trigger(fieldName)
                }}
              />
            ))}
      </List>

      <FormFooter
        backUrl={backUrl}
        buttonProps={{
          loading,
          disabled: !isDirty && !isValid
        }}
      />
    </form>
  )
}

export default ProfessionForm
