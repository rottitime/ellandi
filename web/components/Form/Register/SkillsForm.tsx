import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import ToggleChip from '@/components/ToggleChip'
import { Delete } from '@mui/icons-material'
import { FC, useState } from 'react'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'
import FormFooter from '@/components/Form/FormFooter'

const Stack = styled(Box)`
  .MuiChip-root {
    margin: 5px;
  }
`

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
      <Typography variant="subtitle1" gutterBottom>
        Select any skills that you already have. You can change or add to these later
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>
      <Stack sx={{ mb: 3 }}>
        {list.map((skill) => (
          <ToggleChip
            key={skill}
            label={skill}
            active={!!skills.includes(skill)}
            variant="outlined"
            onToggle={(_e, active) => {
              setSkills((p) =>
                active ? [...p, skill] : p.filter((item) => item !== skill)
              )
            }}
          />
        ))}
      </Stack>

      <Button variant="outlined" sx={{ mb: 3 }} disabled>
        Load more skills
      </Button>

      {!!skills.length && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Selected skill</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill}>
                  <TableCell>{skill}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => setSkills((p) => p.filter((item) => item !== skill))}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <FormFooter backUrl={backUrl} />
    </form>
  )
}

export default SkillsForm
