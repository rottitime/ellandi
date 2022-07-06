import Link from '@/components/UI/Link'
import LinkButton from '@/components/LinkButton'
import Page, { FormFooter } from '@/components/Layout/GenericPage'
import {
  Alert,
  AlertTitle,
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { GenericDataList } from '@/service/types'
import { fetchLanguages } from '@/service/api'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

const optionsSpeaking = [
  {
    title: 'Basic',
    content:
      'You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment'
  },
  {
    title: 'Independent',
    content:
      'You can deal with most situations likely to arise while travelling in an area where the language is spoken and interact with a degree of fluency'
  },
  {
    title: 'Proficient',
    content:
      'You can express ideas fluently and spontaneously and can use the language flexibly for social, academic and professional purposes'
  }
]

const optionsWriting = [
  {
    title: 'Basic',
    content:
      'You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment'
  },
  {
    title: 'Independent',
    content:
      'You can produce clear, detailed text on a wide range of subjects and explain the advantages and disadvantages of a topical issue'
  },
  {
    title: 'Proficient',
    content:
      'You can produce clear, well-structured, detailed text on complex subjects and can express yourself fluently and precisely'
  }
]

const RegisterPage = () => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data, isSuccess } = useQuery<
    GenericDataList[],
    { message?: string }
  >('languages', fetchLanguages, { staleTime: Infinity })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  if (isError)
    return (
      <Alert severity="error">
        <AlertTitle>Service Unavailable</AlertTitle>
        Please try again later.
      </Alert>
    )

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Add any languages that you use. You can change or add to these later.
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>
      <Typography variant="h3" gutterBottom>
        Language one
      </Typography>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={
          isSuccess ? data.map(({ name, slug }) => ({ label: name, id: slug })) : []
        }
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="language"
            variant="filled"
            size="small"
            margin="normal"
            fullWidth
          />
        )}
      />

      <Typography variant="h3" gutterBottom>
        Speaking
      </Typography>
      <Typography gutterBottom>Set a proficiency level for speaking:</Typography>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {optionsSpeaking.map((option) => (
          <FormControlLabel
            key={option.title}
            control={<Radio />}
            label={
              <>
                <Typography>{option.title}</Typography>
                <Typography variant="body2">{option.content}</Typography>
              </>
            }
            value={option.title}
            name="group1"
          />
        ))}
      </RadioGroup>

      <Typography gutterBottom variant="h3">
        Writing
      </Typography>
      <Typography gutterBottom>Set a proficiency level for speaking:</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group2"
      >
        {optionsWriting.map((option) => (
          <FormControlLabel
            key={option.title}
            control={<Radio />}
            label={
              <>
                <Typography>{option.title}</Typography>
                <Typography variant="body2">{option.content}</Typography>
              </>
            }
            value={option.title}
            name="group1"
          />
        ))}
      </RadioGroup>

      <Typography gutterBottom>
        <Link href="/register/page13">Add language</Link>
      </Typography>

      <FormFooter>
        <LinkButton href="/register/page11" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page13">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    title="Create a profile - Language skills"
    footer={
      <Typography gutterBottom>
        <Link href="/register/page13">Skip this step</Link>
      </Typography>
    }
    progress={80}
  >
    {page}
  </Page>
)
