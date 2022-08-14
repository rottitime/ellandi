import {
  FormHelperText,
  IconButton,
  Skeleton,
  styled,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { GenericDataList, Query, LanguageType, LanguagesType } from '@/service/types'
import {
  fetchLanguages,
  fetchLanguageSkillLevels,
  fetchSkillLevels,
  fetchSkills
} from '@/service/api'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props } from './types'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/UI/Button/Button'
import { Cancel } from '@mui/icons-material'

const Row = styled(Field)`
  display: flex;
  gap: ${(p) => p.theme.spacing(3)};
  .creatable-autocomplete {
    width: 350px;
  }
  .button-remove {
    color: ${(p) => p.theme.palette.text.primary};
    margin-left: auto;
  }
  .MuiFormGroup-root {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const fornName: keyof LanguagesType = 'languages'

const skillSchema: SchemaOf<LanguageType> = object({
  id: string().nullable(),
  name: string().required('This is required'),
  speaking_level: string().required('This is required'),
  writing_level: string().required('This is required')
})

const schema: SchemaOf<LanguagesType> = object().shape({
  languages: array().of(skillSchema).optional()
})

const LanguageAddForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const { isLoading, data: dataLanguages } = useQuery<
    GenericDataList[],
    { message?: string }
  >(Query.Languages, fetchLanguages, { staleTime: Infinity })

  const { isLoading: isLoadingLevels, data: dataLevels } = useQuery<
    GenericDataList[],
    { message?: string }
  >(Query.LanguageSkillLevels, fetchLanguageSkillLevels, { staleTime: Infinity })

  const methods = useForm<LanguagesType>({
    defaultValues: { languages: [] },
    resolver: yupResolver(schema)
  })

  const { control, handleSubmit, getValues } = methods

  const { fields, append, remove } = useFieldArray<LanguagesType, 'languages', 'name'>({
    control,
    name: 'languages',
    keyName: 'name'
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        {isLoading ? (
          <Skeleton width={100} sx={{ m: 1 }} />
        ) : (
          !!fields.length && (
            <Table aria-label="Language and levels table" size="small" sx={{ mb: 4 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Language</TableCell>
                  <TableCell sx={{ width: 145 }}>Speaking</TableCell>
                  <TableCell sx={{ width: 145 }}>Writng</TableCell>
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
                        name={`languages.${index}.name`}
                        control={control}
                        defaultValue={item.name}
                        render={({ field, fieldState: { error } }) => (
                          <FormControl fullWidth error={!!error} size="small">
                            <InputLabel>Language</InputLabel>
                            {isLoading ? (
                              <Skeleton width={100} sx={{ m: 1 }} />
                            ) : (
                              <Select label="Language" variant="outlined" {...field}>
                                {dataLanguages.map(({ name }) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    disabled={
                                      !!getValues(fornName).find(
                                        (language) => language.name === name
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
                        {isLoadingLevels ? (
                          <Skeleton sx={{ height: 60 }} />
                        ) : (
                          <Controller
                            name={
                              `languages.${index}.${name.toLowerCase()}_level` as `languages.${number}`
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
                                  {dataLevels.map(({ name }) => (
                                    <MenuItem key={name} value={name}>
                                      {name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {!!error && (
                                  <FormHelperText error>{error.message}</FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        )}
                      </TableCell>
                    ))}

                    <TableCell align="right" sx={{ padding: 1 }}>
                      <IconButton
                        className="button-remove"
                        aria-label="Remove"
                        title="Remove"
                        onClick={() => remove(index)}
                      >
                        <Icon icon="circle-delete" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        )}

        <Field>
          <Button
            sx={{ color: 'text.primary' }}
            variant="text"
            startIcon={<Icon icon="circle-plus" />}
            onClick={() => {
              append({ name: '', speaking_level: '', writing_level: '' })
            }}
          >
            Add another language
          </Button>
        </Field>
        <Field textAlign="right">
          <Button type="submit" variant="contained" loading={loading}>
            Submit skills
          </Button>
        </Field>
      </form>
    </FormProvider>
  )
}

export default LanguageAddForm
