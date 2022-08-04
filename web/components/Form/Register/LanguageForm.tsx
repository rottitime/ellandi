import {
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
import { GenericDataList, LanguagesType, LanguageType, Query } from '@/service/types'
import { fetchLanguages } from '@/service/api'
import { FC, useId } from 'react'
import { useQuery } from 'react-query'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '../Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Cancel } from '@mui/icons-material'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

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

const LanguageForm: FC<StandardRegisterProps<LanguagesType>> = (props) => {
  const formId = useId()
  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Languages,
    fetchLanguages,
    { staleTime: Infinity }
  )

  const methods = useForm<LanguagesType>({
    defaultValues: {
      languages: []
    },
    resolver: yupResolver(schema)
  })
  const { control, getValues } = methods

  const { fields, append, remove } = useFieldArray<
    LanguagesType,
    'languages',
    'language'
  >({
    control,
    name: 'languages',
    keyName: 'language'
  })

  return (
    <FormProvider {...methods}>
      <Form {...props}>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Add any languages that you use. You can change or add to these later.
        </Typography>
        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        {fields.map((item, index) => (
          <Box key={index}>
            <Typography gutterBottom>Language {index + 1}</Typography>

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
                  name={
                    `languages.${index}.${name.toLowerCase()}` as `languages.${number}`
                  }
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
                        {...field}
                      >
                        {options[name.toLowerCase()].map(({ title, content }) => (
                          <Field key={title}>
                            <FormControlLabel
                              control={<Radio sx={{ pt: 0 }} />}
                              sx={{ alignItems: 'flex-start' }}
                              label={
                                <>
                                  <Typography>
                                    <b>{title}</b>
                                  </Typography>
                                  <Collapse in={field.value === title}>
                                    <Typography>{content}</Typography>
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
      </Form>
    </FormProvider>
  )
}

export default LanguageForm
