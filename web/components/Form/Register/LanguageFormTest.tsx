import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  Tooltip
} from '@mui/material'
import { GenericDataList, LanguagesType, LanguageType, Query } from '@/service/types'
import { fetchLanguages } from '@/service/api'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '../Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddCircleOutline, Cancel, Help } from '@mui/icons-material'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const Table = styled(MuiTable)`
  th {
    svg {
      vertical-align: middle;
      margin-left: ${(p) => p.theme.spacing(1)};
    }
  }
  td {
    padding: ${(p) => p.theme.spacing(2, 1)};
    vertical-align: top;
  }
`

const fornName: keyof LanguagesType = 'languages'

const levels = ['Basic', 'Independant', 'Proficient']

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

const languageSchema: SchemaOf<LanguageType> = object({
  language: string().required('This is required'),
  writing: string().required('This is required'),
  speaking: string().required('This is required')
})

const schema: SchemaOf<LanguagesType> = object().shape({
  languages: array().of(languageSchema).optional()
})

const LanguageForm: FC<StandardRegisterProps<LanguagesType>> = (props) => {
  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Languages,
    fetchLanguages,
    { staleTime: Infinity }
  )

  const methods = useForm<LanguagesType>({
    defaultValues: { languages: [] },
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

  const renderTooltip = (list = []) =>
    list.map(({ title, content }) => (
      <p key={title}>
        <b>{title}</b>
        <br />
        {content}
      </p>
    ))

  return (
    <FormProvider {...methods}>
      <Form {...props}>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Add any languages that you use. You can change or add to these later.
        </Typography>
        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        {isLoading ? (
          <Skeleton width={100} sx={{ m: 1 }} />
        ) : (
          !!fields.length && (
            <Table aria-label="simple table" size="small" sx={{ mb: 4 }}>
              <caption>Your list of skills</caption>

              <TableHead>
                <TableRow>
                  <TableCell>Language</TableCell>
                  <TableCell sx={{ width: 145 }}>
                    Speaking
                    <Tooltip title={renderTooltip(optionsSpeaking)}>
                      <Help />
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ width: 145 }}>
                    Writng
                    <Tooltip title={renderTooltip(optionsWriting)}>
                      <Help />
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ width: 20, p: 1 }}>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row">
                      <Controller
                        name={`languages.${index}.language`}
                        control={control}
                        defaultValue={item.language}
                        render={({ field, fieldState: { error } }) => (
                          <FormControl fullWidth error={!!error} size="small">
                            <InputLabel>Language</InputLabel>
                            {isLoading ? (
                              <Skeleton width={100} sx={{ m: 1 }} />
                            ) : (
                              <Select label="Language" variant="outlined" {...field}>
                                {data.map(({ name }) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    disabled={
                                      !!getValues(fornName).find(
                                        ({ language }) => language === name
                                      )
                                    }
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                            {!!error && (
                              <FormHelperText error>{error.message}</FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </TableCell>

                    {['Speaking', 'Writing'].map((name) => (
                      <TableCell key={name}>
                        <Controller
                          name={
                            `languages.${index}.${name.toLowerCase()}` as `languages.${number}`
                          }
                          control={control}
                          defaultValue={item[name] as LanguageType}
                          render={({ field, fieldState: { error } }) => (
                            <FormControl fullWidth error={!!error} size="small">
                              <InputLabel>Level</InputLabel>
                              <Select
                                label="Select a level"
                                variant="outlined"
                                {...field}
                              >
                                {levels.map((level) => (
                                  <MenuItem key={level} value={level}>
                                    {level}
                                  </MenuItem>
                                ))}
                              </Select>
                              {!!error && (
                                <FormHelperText error>{error.message}</FormHelperText>
                              )}
                            </FormControl>
                          )}
                        />
                      </TableCell>
                    ))}

                    <TableCell align="right" sx={{ padding: 1 }}>
                      <IconButton
                        aria-label="Remove"
                        title="Remove"
                        onClick={() => remove(index)}
                      >
                        <Cancel />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        )}

        <Field textAlign="right">
          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
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
