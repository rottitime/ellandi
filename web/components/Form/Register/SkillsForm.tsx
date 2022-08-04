import { Chip, Typography, Stack, Divider, Skeleton } from '@mui/material'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from './types'
import { FormProvider, useForm } from 'react-hook-form'
import CreatableAutocomplete from '../CreatableAutocomplete/CreatableAutocomplete'
import { Query, SkillsType } from '@/service/types'
import { fetchSkills } from '@/service/api'
import { useQuery } from 'react-query'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { Field } from '../Field/Field'

const schema: SchemaOf<SkillsType> = object().shape({
  skills: array().of(string())
})
const fieldName: keyof SkillsType = 'skills'

const SkillsForm: FC<StandardRegisterProps<SkillsType>> = (props) => {
  const methods = useForm<SkillsType>({
    defaultValues: { skills: [] },
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

  const skills = watch('skills')

  return (
    <FormProvider {...methods}>
      <Form {...props}>
        <Typography variant="subtitle1" gutterBottom>
          Add any skills that you already have. You can change or add to these later
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
              disableOptions={skills}
              label="Select a skill or enter your own skill"
              data={isLoading ? [] : data.map((name) => ({ name }))}
              onSelected={async (_event, { name }) => {
                setValue(
                  fieldName,
                  Array.isArray(skills) && skills?.includes(name)
                    ? skills.filter((item) => item !== name)
                    : [...skills, name]
                )
              }}
            />
          </Field>
        )}

        {Array.isArray(skills) && !!skills.length && (
          <>
            <Divider variant="middle" sx={{ my: 4 }} />

            <Typography variant="h3" sx={{ mb: 3 }}>
              Your selected skills
            </Typography>

            <Stack flexWrap="wrap" direction="row" gap={3}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() =>
                    setValue(
                      fieldName,
                      skills.filter((item) => item !== skill)
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
