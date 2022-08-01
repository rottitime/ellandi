import {
  Chip,
  Typography,
  Stack,
  Divider,
  Alert,
  AlertTitle,
  Skeleton
} from '@mui/material'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'
import FormFooter from '@/components/Form/FormFooter'
import CreatableAutocomplete from '../CreatableAutocomplete/CreatableAutocomplete'
import { Field } from '../Field'
import { Query, SkillsType } from '@/service/types'
import { fetchSkills } from '@/service/api'
import { useQuery } from 'react-query'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema: SchemaOf<SkillsType> = object().shape({
  skills: array().of(string())
})
const fieldName: keyof SkillsType = 'skills'

const SkillsForm: FC<StandardRegisterProps<SkillsType>> = ({
  backUrl,
  onFormSubmit,

  defaultValues = {
    skills: []
  }
}) => {
  const { handleSubmit, setValue, register, unregister, watch } = useForm<SkillsType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { isLoading, isError, data } = useQuery<string[], { message?: string }>(
    Query.Skills,
    fetchSkills
  )

  useEffect(() => {
    register(fieldName)
    return () => unregister(fieldName)
  }, [register, unregister])

  const skills = watch('skills')

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
                skills?.includes(name)
                  ? skills.filter((item) => item !== name)
                  : [...skills, name]
              )
            }}
          />
        </Field>
      )}

      {!!skills.length && (
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

      <FormFooter backUrl={backUrl} />
    </form>
  )
}

export default SkillsForm
