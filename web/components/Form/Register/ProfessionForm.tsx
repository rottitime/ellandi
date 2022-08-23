import { Alert, AlertTitle, Box, Skeleton, Typography } from '@mui/material'
import Chip from '@/components/Chip/Chip'
import { fetchProfessions } from '@/service/api'
import { GenericDataList, ProfessionType, Query } from '@/service/types'
import { useQuery } from 'react-query'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from './types'
import { FormProvider, useForm } from 'react-hook-form'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const fieldName: keyof ProfessionType = 'professions'

const schema: SchemaOf<ProfessionType> = object().shape({
  professions: array().of(string()).min(1, 'This is a required field'),
  profession_other: string()
    .nullable()
    .when('professions', (value) => {
      if (value.includes('Other'))
        return string().nullable().required('This is a required field')
    })
})

const ProfessionForm: FC<StandardRegisterProps<ProfessionType>> = (props) => {
  const methods = useForm<ProfessionType>({
    defaultValues: {
      professions: [],
      profession_other: ''
    },
    resolver: yupResolver(schema)
  })

  const { getValues, setValue, register, trigger, watch } = methods

  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Professions,
    fetchProfessions,
    { staleTime: Infinity }
  )

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
      <Form {...props} submitDisabled>
        <Typography variant="subtitle1" gutterBottom>
          Select the profession(s) that you belong to. You may choose more than one
        </Typography>

        {isLoading
          ? [...Array(22).keys()].map((i) => (
              <Skeleton key={i} width={100} sx={{ m: 1 }} />
            ))
          : [...data].map(({ name, slug }) => (
              <Box sx={{ mb: 1 }} key={name}>
                <Chip
                  avatarText={slug === 'i-dont-know' ? '?' : name.charAt(0).toUpperCase()}
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
                  toggle
                />

                {name === 'Other' && watchFields.professions.includes('Other') && (
                  <Box sx={{ my: 3 }}>
                    <TextFieldControlled
                      name="profession_other"
                      label="Enter profession"
                      subfield
                    />
                  </Box>
                )}
              </Box>
            ))}
      </Form>
    </FormProvider>
  )
}

export default ProfessionForm
