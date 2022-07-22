import { Chip, Typography, Stack, Divider, Alert, AlertTitle } from '@mui/material'
import { FC, useState } from 'react'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'
import FormFooter from '@/components/Form/FormFooter'
import Autocomplete from '../Autocomplete'
import { Field } from '../Field'
import { Query, SkillsType } from '@/service/types'
import { fetchSkills } from '@/service/api'
import { useQuery } from 'react-query'

const SkillsForm: FC<StandardRegisterProps<SkillsType>> = ({ backUrl, onFormSubmit }) => {
  const { handleSubmit } = useForm()
  const [skills, setSkills] = useState<string[]>([])

  const { isLoading, isError, data } = useQuery<string[], { message?: string }>(
    Query.Skills,
    fetchSkills
  )

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
        Add any skills that you already have. You can change or add to these later
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        We'll use this to suggest learning opportunities that are relevant to you
      </Typography>

      <Field>
        <Autocomplete
          loading={isLoading}
          label="Select a skill or enter your own skill"
          data={isLoading ? [] : data.map((name) => ({ name }))}
          onSelected={(_event, value) => {
            const name = value?.name
            name &&
              setSkills((p) =>
                !!p.includes(name) ? p.filter((item) => item !== name) : [...p, name]
              )
          }}
        />
      </Field>

      {!!skills.length && (
        <>
          <Divider variant="middle" sx={{ my: 4 }} />

          <Typography variant="h3" sx={{ mb: 3 }}>
            Your selected skills
          </Typography>

          <Stack direction="row" spacing={1}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => setSkills((p) => p.filter((item) => item !== skill))}
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
