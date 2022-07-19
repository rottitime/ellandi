import { Chip, Typography, Stack, Divider } from '@mui/material'
import { FC, useState } from 'react'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'
import FormFooter from '@/components/Form/FormFooter'
import Autocomplete from '../Autocomplete'
import { Field } from '../Field'

const list = [
  'Auditing',
  'Bookkeeping',
  'Communication',
  'Coding',
  'Creative thinking',
  'Customer service',
  'Data entry',
  'Diary management',
  'Flexibility',
  'Microsoft Office',
  'Motivation',
  'Negotiation',
  'Planning',
  'Problem solving',
  'Project management',
  'Sales',
  'Social media',
  'Teamwork'
]

const SkillsForm: FC<StandardRegisterProps<null>> = ({ backUrl, onFormSubmit }) => {
  const { handleSubmit } = useForm()
  const [skills, setSkills] = useState<string[]>([])

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
          label="Select a skill or enter your own skill"
          data={list.map((item) => ({ name: item }))}
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