import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { fetchProfessions } from '@/service/api'
import {
  GenericDataList,
  ProfessionType,
  Query,
  RegisterUserResponse
} from '@/service/types'
import { useQuery } from 'react-query'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { useProfile } from '@/hooks/useProfile'

const fieldName: keyof ProfessionType = 'professions'

const schema: SchemaOf<ProfessionType> = object().shape({
  professions: array().of(string()).min(1, 'Enter your profession'),
  profession_other: string()
    .nullable()
    .when('professions', (value) => {
      if (value.includes('Other'))
        return string().nullable().required('Enter your profession')
    })
})

const ProfessionForm: FC<StandardRegisterProps<ProfessionType>> = (props) => {
  const { userProfile } = useProfile<RegisterUserResponse>({})
  const primary_profession = userProfile?.primary_profession

  const methods = useForm<ProfessionType>({
    defaultValues: {
      professions: [],
      profession_other: ''
    },
    resolver: yupResolver(schema)
  })

  const { getValues, setValue, register, trigger, watch, control } = methods

  const { data, isSuccess } = useQuery<GenericDataList[], { message?: string }>(
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

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography gutterBottom>
          Select any other profession(s) that you belong to. You may choose more than one
        </Typography>

        {isSuccess &&
          data
            .filter(({ name }) => name !== primary_profession)
            .map(({ name }) => (
              <Box sx={{ mb: 1 }} key={name}>
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={name}
                      control={
                        <Checkbox
                          checked={field.value.includes(name)}
                          onChange={async () => {
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
                      }
                    />
                  )}
                />
                {primary_profession !== 'Other' &&
                  name !== 'Other' &&
                  watchFields.professions.includes('Other') && (
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
