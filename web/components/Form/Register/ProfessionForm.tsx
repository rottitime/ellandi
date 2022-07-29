import { Alert, AlertTitle, Avatar, Box, Skeleton, Typography } from '@mui/material'
import ToggleChip from '@/components/ToggleChip'
import { fetchProfessions } from '@/service/api'
import { GenericDataList, ProfessionType, Query } from '@/service/types'
import { useUiContext } from '@/context/UiContext'
import { useQuery } from 'react-query'
import { FC, useEffect } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { FormProvider, useForm } from 'react-hook-form'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'

const fieldName: keyof ProfessionType = 'professions'

const schema: SchemaOf<ProfessionType> = object().shape({
  professions: array().of(string()).min(1, 'This is a required field'),
  profession_other: string().when('professions', (value) => {
    if (value.includes('Other')) return string().required('This is a required field')
  })
})

const ProfessionForm: FC<StandardRegisterProps<ProfessionType>> = ({
  backUrl,
  skipUrl,
  onFormSubmit,
  loading,
  defaultValues = {
    professions: [],
    profession_other: ''
  }
}) => {
  const methods = useForm<ProfessionType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    trigger,
    watch,
    formState: { isDirty, isValid }
  } = methods

  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Professions,
    fetchProfessions
  )
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    if (!!watchFields.profession_other)
      setValue('professions', [...watchFields.professions, 'Other'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const watchFields = watch()

  register(fieldName)

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
          Select the Profession(s) that you belong to. You may choose more than one
        </Typography>

        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        {isLoading
          ? [...Array(22).keys()].map((i) => (
              <Skeleton key={i} width={100} sx={{ m: 1 }} />
            ))
          : [...data, { name: 'Other' }].map(({ name }) => (
              <Box sx={{ mb: 1 }} key={name}>
                <ToggleChip
                  avatar={<Avatar>{name.charAt(0).toUpperCase()}</Avatar>}
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

                {name === 'Other' && watchFields.professions.includes('Other') && (
                  <Box sx={{ my: 2 }}>
                    <TextFieldControlled
                      name="profession_other"
                      label="Enter profession"
                    />
                  </Box>
                )}
              </Box>
            ))}

        <FormFooter
          skipUrl={skipUrl}
          backUrl={backUrl}
          buttonProps={{
            loading,
            disabled: !isDirty && !isValid
          }}
        />
      </form>
    </FormProvider>
  )
}

export default ProfessionForm
