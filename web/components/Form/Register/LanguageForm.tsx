import Link from '@/components/UI/Link'
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Collapse,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { GenericDataList, LanguagesType, Query } from '@/service/types'
import { fetchLanguages } from '@/service/api'
import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'
import FormFooter from '@/components/Form/FormFooter'
import { Field } from '../Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const fieldName: keyof LanguagesType = 'languages'

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

const schema: SchemaOf<LanguagesType> = object().shape({
  languages: array().of(
    object().shape({
      language: string().required(),
      writing: string().required(),
      speaking: string().required()
    })
  )
})

const LanguageForm: FC<StandardRegisterProps<LanguagesType>> = ({
  backUrl,
  onFormSubmit,
  defaultValues = {
    languages: []
  }
}) => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data, isSuccess } = useQuery<
    GenericDataList[],
    { message?: string }
  >(Query.Languages, fetchLanguages)

  const { handleSubmit, register } = useForm<LanguagesType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  const checked = true
  register(fieldName)

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
        Add any languages that you use. You can change or add to these later.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        We'll use this to suggest learning opportunities that are relevant to you
      </Typography>
      <Typography variant="h4" gutterBottom>
        Language one
      </Typography>

      <Field>
        <Autocomplete
          disablePortal
          options={
            isSuccess ? data.map(({ name, slug }) => ({ label: name, id: slug })) : []
          }
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a language"
              variant="filled"
              size="small"
              margin="normal"
              fullWidth
            />
          )}
        />
      </Field>

      <Box>
        <Collapse in={checked}>
          <Field>
            <Typography variant="h4" gutterBottom>
              Speaking
            </Typography>

            <Typography gutterBottom>Set a proficiency level for speaking:</Typography>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {optionsSpeaking.map((option) => (
                <Field key={option.title}>
                  <FormControlLabel
                    control={<Radio />}
                    label={
                      <>
                        <Typography variant="h4">{option.title}</Typography>
                        <Typography variant="body2">{option.content}</Typography>
                      </>
                    }
                    value={option.title}
                    name="group1"
                  />
                </Field>
              ))}
            </RadioGroup>
          </Field>

          <Field>
            <Typography gutterBottom variant="h4">
              Writing
            </Typography>
            <Typography gutterBottom>Set a proficiency level for writing:</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group2"
            >
              {optionsWriting.map((option) => (
                <Field key={option.title}>
                  <FormControlLabel
                    key={option.title}
                    control={<Radio />}
                    label={
                      <>
                        <Typography variant="h4">{option.title}</Typography>
                        <Typography variant="body2">{option.content}</Typography>
                      </>
                    }
                    value={option.title}
                    name="group1"
                  />
                </Field>
              ))}
            </RadioGroup>
          </Field>
        </Collapse>
      </Box>

      <Typography gutterBottom>
        <Link href="#">Add language</Link>
      </Typography>

      <FormFooter backUrl={backUrl} />
    </form>
  )
}

export default LanguageForm
