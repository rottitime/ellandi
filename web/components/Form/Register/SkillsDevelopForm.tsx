import { Chip, Typography, Stack, Divider, Skeleton } from '@mui/material'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from './types'
import { FormProvider, useForm } from 'react-hook-form'
import CreatableAutocomplete from '../CreatableAutocomplete/CreatableAutocomplete'
import { Query, SkillsDevelopType } from '@/service/types'
import { fetchSkills } from '@/service/api'
import { useQuery } from 'react-query'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { Field } from '../Field/Field'

const schema: SchemaOf<SkillsDevelopType> = object().shape({
  skills_develop: array().of(string())
})
const fieldName: keyof SkillsDevelopType = 'skills_develop'

const SkillsForm: FC<StandardRegisterProps<SkillsDevelopType>> = (props) => {
  const methods = useForm<SkillsDevelopType>({
    defaultValues: { skills_develop: [] },
    resolver: yupResolver(schema)
  })
  const { setValue, register, unregister, watch } = methods

  const { isLoading, data } = useQuery<string[], { message?: string }>(
    Query.Skills,
    fetchSkills,
    { staleTime: Infinity }
  )

  useEffect(() => {
    register(fieldName)
    return () => unregister(fieldName)
  }, [register, unregister])

  const watchFields = watch(fieldName) || []

  return (
    <FormProvider {...methods}>
      <Form {...props}>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Add any skills that you would like to develop. You can change or add to these
          later
        </Typography>
        <Typography sx={{ mb: 4 }}>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        {isLoading ? (
          <Skeleton width={100} sx={{ m: 1 }} />
        ) : (
          <Field>
            <CreatableAutocomplete
              loading={isLoading}
              disableOptions={watchFields}
              label="Select a skill or enter your own skill"
              data={isLoading ? [] : data.map((title) => ({ title }))}
              onSelected={async (_event, { title }) => {
                setValue(
                  fieldName,
                  Array.isArray(watchFields) && watchFields?.includes(title)
                    ? watchFields.filter((item) => item !== title)
                    : [...watchFields, title]
                )
              }}
            />
          </Field>
        )}

        {Array.isArray(watchFields) && !!watchFields.length && (
          <>
            <Divider variant="middle" sx={{ my: 4 }} />

            <Typography sx={{ mb: 3 }}>Your selected skills</Typography>

            <Stack flexWrap="wrap" direction="row" gap={3}>
              {watchFields.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() =>
                    setValue(
                      fieldName,
                      watchFields.filter((item) => item !== skill)
                    )
                  }
                />
              ))}
            </Stack>
          </>
        )}
      </Form>
    </FormProvider>
  )
}

export default SkillsForm
