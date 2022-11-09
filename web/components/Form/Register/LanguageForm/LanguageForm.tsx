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
  Typography
} from '@mui/material'
import { GenericDataList, LanguagesType, LanguageType, Query } from '@/service/types'
import { fetchLanguageSkillLevels } from '@/service/api'
import { FC, useEffect, useId } from 'react'
import { useQuery } from 'react-query'
import { StandardRegisterProps } from '../types'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '../../Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Cancel } from '@mui/icons-material'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import data from '@/prefetch/languages.json'

const fieldName: keyof LanguagesType = 'languages'

const content = {
  speaking: {
    Basic:
      'You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment',
    Independent:
      'You can deal with most situations likely to arise while travelling in an area where the language is spoken and interact with a degree of fluency',
    Proficient:
      'You can express ideas fluently and spontaneously and can use the language flexibly for social, academic and professional purposes'
  },
  writing: {
    Basic:
      'You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment',
    Independent:
      'You can produce clear, detailed text on a wide range of subjects and explain the advantages and disadvantages of a topical issue',
    Proficient:
      'You can produce clear, well-structured, detailed text on complex subjects and can express yourself fluently and precisely'
  }
}

const languageSchema: SchemaOf<LanguageType> = object({
  id: string().nullable(),
  name: string().required('This is a required field'),
  writing_level: string().required('This is a required field'),
  speaking_level: string().required('This is a required field')
})

const schema: SchemaOf<LanguagesType> = object().shape({
  languages: array().of(languageSchema).min(1, 'This is a required field')
})

const LanguageForm: FC<StandardRegisterProps<LanguagesType>> = (props) => {
  const formId = useId()

  const { isLoading: isLoadingLevels, data: dataLevels } = useQuery<
    GenericDataList[],
    { message?: string }
  >(Query.LanguageSkillLevels, fetchLanguageSkillLevels, { staleTime: Infinity })

  const methods = useForm<LanguagesType>({
    defaultValues: {
      languages: []
    },
    resolver: yupResolver(schema)
  })
  const { control, getValues, reset } = methods

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
    const languages = getValues(fieldName)

    if (!languages.length) {
      append({ name: '', speaking_level: '', writing_level: '' })
    } else {
      reset({ languages })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled data-testid="language-form">
        <Typography sx={{ mb: 3 }}>
          Add any languages that you use. You can change or add to these later.
        </Typography>

        {fields.map((item, index) => (
          <Box key={index} data-testid={`languagerow-${index}`}>
            <Typography gutterBottom>Language {index + 1}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Field sx={{ width: '100%' }}>
                <Controller
                  name={`languages.${index}.name`}
                  control={control}
                  defaultValue={item.language}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error} size="small">
                      <InputLabel>Select a language</InputLabel>

                      <Select
                        label="Select a language"
                        variant="outlined"
                        {...field}
                        inputProps={{ 'data-testid': `languages.${index}.name` }}
                      >
                        {data.map(({ name }) => (
                          <MenuItem
                            key={name}
                            value={name}
                            disabled={
                              !!getValues(fieldName).find(
                                (language) => language.name === name
                              )
                            }
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>

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
                    `languages.${index}.${name.toLowerCase()}_level` as `languages.${number}`
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

                      {isLoadingLevels ? (
                        [...Array(3).keys()].map((i) => <RadioSkeleton key={i} />)
                      ) : (
                        <>
                          <RadioGroup
                            aria-labelledby={`${formId}${index}:${name.toLowerCase()}`}
                            {...field}
                          >
                            {dataLevels.map(({ name: title }) => (
                              <Field key={title}>
                                <FormControlLabel
                                  control={<Radio sx={{ pt: 0 }} />}
                                  sx={{ alignItems: 'flex-start' }}
                                  label={
                                    <>
                                      <Typography>
                                        <b>{title}</b>
                                      </Typography>
                                      <Collapse in={field.value === (title as unknown)}>
                                        <Typography>
                                          {content[name.toLowerCase()][title]}
                                        </Typography>
                                      </Collapse>
                                    </>
                                  }
                                  value={title}
                                />
                              </Field>
                            ))}
                          </RadioGroup>
                          {!!error && <FormHelperText>{error.message}</FormHelperText>}
                        </>
                      )}
                    </FormControl>
                  )}
                />
              </Field>
            ))}
          </Box>
        ))}

        <Field>
          <Button
            data-testid="button-addlanguagerow"
            onClick={() => {
              append({ name: '', speaking_level: '', writing_level: '' })
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
