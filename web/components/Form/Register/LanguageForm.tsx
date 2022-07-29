import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Typography
} from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { GenericDataList, LanguagesType, LanguageType, Query } from '@/service/types'
import { fetchLanguages } from '@/service/api'
import { FC, useEffect, useId } from 'react'
import { useQuery } from 'react-query'
import { StandardRegisterProps } from './types'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import FormFooter from '@/components/Form/FormFooter'
import { Field } from '../Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Cancel } from '@mui/icons-material'

const fieldName: keyof LanguagesType = 'languages'

const options = {
  speaking: [
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
  ],
  writing: [
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
}

const languageSchema: SchemaOf<LanguageType> = object({
  language: string().required('This is a required field'),
  writing: string().required('This is a required field'),
  speaking: string().required('This is a required field')
})

const schema: SchemaOf<LanguagesType> = object().shape({
  languages: array().of(languageSchema).optional()
})

const LanguageForm: FC<StandardRegisterProps<LanguagesType>> = ({
  backUrl,
  skipUrl,
  onFormSubmit,
  defaultValues = {
    languages: [
      {
        language: 'Other',
        speaking: 'Basic',
        writing: 'Independent'
      },
      {
        language: 'Russian',
        speaking: 'Basic',
        writing: 'Basic'
      }
    ]
  }
}) => {
  const { setLoading } = useUiContext()
  const formId = useId()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Languages,
    fetchLanguages
  )

  const { handleSubmit, control, getValues } = useForm<LanguagesType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { fields, append, remove } = useFieldArray<
    LanguagesType,
    'languages',
    'language'
  >({
    control,
    name: 'languages',
    keyName: 'language'
  })

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
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Add any languages that you use. You can change or add to these later.
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning opportunities that are relevant to you
      </Typography>

      {fields.map((item, index) => (
        <Box key={index}>
          <Typography variant="h4" gutterBottom>
            Language {index + 1}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Field sx={{ width: '100%' }}>
              <Controller
                name={`languages.${index}.language`}
                control={control}
                defaultValue={item.language}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error} size="small">
                    <InputLabel>Select a language</InputLabel>
                    {isLoading ? (
                      <Skeleton width={100} sx={{ m: 1 }} />
                    ) : (
                      <Select label="Select a language" variant="outlined" {...field}>
                        {data.map(({ name }) => (
                          <MenuItem
                            key={name}
                            value={name}
                            disabled={
                              !!getValues(fieldName).find(
                                ({ language }) => language === name
                              )
                            }
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    {!!error && <FormHelperText error>{error.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Field>
            <IconButton aria-label="Remove" onClick={() => remove(index)}>
              <Cancel />
            </IconButton>
          </Box>

          <Typography gutterBottom>
            Set a proficiency level for speaking and writing
          </Typography>

          {['Speaking', 'Writing'].map((name) => (
            <Field key={name}>
              <Controller
                name={`languages.${index}.${name.toLowerCase()}` as `languages.${number}`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error} size="small">
                    <FormLabel
                      id={`${formId}${index}:${name.toLowerCase()}`}
                      sx={{ mb: 3 }}
                    >
                      {name}
                    </FormLabel>

                    <RadioGroup
                      aria-labelledby={`${formId}${index}:${name.toLowerCase()}`}
                    >
                      {options[name.toLowerCase()].map(({ title, content }) => (
                        <Field key={title}>
                          <FormControlLabel
                            {...field}
                            control={<Radio sx={{ pt: 0 }} />}
                            sx={{ alignItems: 'flex-start' }}
                            label={
                              <>
                                <Typography variant="h4">{title} </Typography>
                                <Collapse in={field.value === title}>
                                  <Typography variant="body2">{content}</Typography>
                                </Collapse>
                              </>
                            }
                            value={title}
                          />
                        </Field>
                      ))}
                    </RadioGroup>
                    {!!error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Field>
          ))}
        </Box>
      ))}

      <Field>
        <Button
          onClick={() => {
            append({ language: '', speaking: '', writing: '' })
          }}
        >
          Add language
        </Button>
      </Field>

      <FormFooter skipUrl={skipUrl} backUrl={backUrl} />
    </form>
  )
}

export default LanguageForm
