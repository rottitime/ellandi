import Link from '@/components/Link'
import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage'
import { FormControlLabel, LinearProgress, Radio, RadioGroup, TextField, Typography } from '@mui/material'

const RegisterPage = () => {
  return (
    <Page>

<LinearProgress variant="determinate" value={80} sx={{ mb: 6 }} />


      <Typography variant="h1" gutterBottom>
        Create a profile - Language skills
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Add any languages that you use. You can change or add to these later.
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>
      <Typography variant="h2" gutterBottom>
        Language one
      </Typography>

      <TextField margin="normal" label="Select a language:" variant="filled" fullWidth />

      <Typography gutterBottom>Speaking</Typography>
      <Typography gutterBottom>Set a proficiency level for speaking:</Typography>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel
          control={<Radio />}
          label="You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment"
          value="You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment"
          name="group1"
        />

        <FormControlLabel
          control={<Radio />}
          label="You can deal with most situations likely to arise while travelling in an area where the language is spoken and interact with a degree of fluency"
          value="You can deal with most situations likely to arise while travelling in an area where the language is spoken and interact with a degree of fluency"
          name="group1"
        />

        <FormControlLabel
          control={<Radio />}
          label="You can express ideas fluently and spontaneously and can use the language flexibly for social, academic and professional purposes"
          value="You can express ideas fluently and spontaneously and can use the language flexibly for social, academic and professional purposes"
          name="group1"
        />
      </RadioGroup>

      <Typography gutterBottom>Writing</Typography>
      <Typography gutterBottom>Set a proficiency level for speaking:</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group2"
      >
        <FormControlLabel
          control={<Radio />}
          label="You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment"
          value="You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment"
          name="group2"
        />

        <FormControlLabel
          control={<Radio />}
          label="You can produce clear, detailed text on a wide range of subjects and explain the advantages and disadvantages of a topical issue"
          value="You can produce clear, detailed text on a wide range of subjects and explain the advantages and disadvantages of a topical issue"
          name="group2"
        />

        <FormControlLabel
          control={<Radio />}
          label="You can produce clear, well-structured, detailed text on complex subjects and can express yourself fluently and precisely"
          value="You can produce clear, well-structured, detailed text on complex subjects and can express yourself fluently and precisely"
          name="group2"
        />
      </RadioGroup>

      <Typography gutterBottom>
        <Link href="/mock/page12">Add language</Link>
      </Typography>
      <Typography gutterBottom>
        <Link href="/mock/page12">Skip this step</Link>
      </Typography>

      <LinkButton href="/register/page12">Continue</LinkButton>
    </Page>
  )
}

export default RegisterPage
