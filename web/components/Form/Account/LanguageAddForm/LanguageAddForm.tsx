import {
  FormHelperText,
  IconButton,
  Skeleton,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled
} from '@mui/material'
import {
  GenericDataList,
  Query,
  LanguageType,
  LanguagesType,
  RegisterUserResponse
} from '@/service/types'
import { fetchLanguages, fetchLanguageSkillLevels } from '@/service/api'
import { FC, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props } from './types'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'

const Table = styled(MuiTable)`
  th.MuiTableCell-root {
    border-bottom: none;
    font-weight: bold;
  }
  .button-remove {
    color: ${(p) => p.theme.colors.black};
  }
  td {
    vertical-align: top;
  }
`

const skillSchema: SchemaOf<LanguageType> = object({
  id: string().nullable(),
  name: string().required('Select a language'),
  speaking_level: string().required('Select a proficiency level'),
  writing_level: string().required('Select a proficiency level')
})

const schema: SchemaOf<LanguagesType> = object().shape({
  languages: array().of(skillSchema).optional()
})

const LanguageAddForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const { authFetch } = useAuth()

  const { isLoading, data: dataLanguages } = useQuery<
    GenericDataList[],
    { message?: string }
  >(Query.Languages, fetchLanguages, { staleTime: Infinity })

  const { isLoading: isLoadingLevels, data: dataLevels } = useQuery<
    GenericDataList[],
    { message?: string }
  >(Query.LanguageSkillLevels, fetchLanguageSkillLevels, { staleTime: Infinity })

  const { isFetched: isFetchedMe, data: dataMe } = useQuery<RegisterUserResponse>(
    Query.Me,
    () => authFetch(fetchMe)
  )

  const methods = useForm<LanguagesType>({
    defaultValues: { languages: [] },
    resolver: yupResolver(schema)
  })

  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray<LanguagesType, 'languages', 'name'>({
    control,
    name: 'languages'
  })

  useEffect(() => {
    append({ name: '', speaking_level: '', writing_level: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disableOptions = useMemo(
    () => [
      ...fields.map(({ name }) => name),
      ...(isFetchedMe ? dataMe.languages.map(({ name }) => name) : [])
    ],
    [fields, isFetchedMe, dataMe]
  )

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
                  <TableCell sx={{ width: 145 }}>Writing</TableCell>
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
                                      !!disableOptions.find(
                                        (language) => language === name
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
            Add skills
          </Button>
        </Field>
      </form>
    </FormProvider>
  )
}

export default LanguageAddForm
