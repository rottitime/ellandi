import {
  FormHelperText,
  IconButton,
  Skeleton,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
  Box
} from '@mui/material'
import {
  GenericDataList,
  Query,
  RegisterUserResponse,
  SkillsType,
  SkillType
} from '@/service/types'
import { fetchSkillLevels, fetchSkills } from '@/service/api'
import { FC, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props } from './types'
import CreatableAutocomplete from '../../CreatableAutocomplete/CreatableAutocomplete'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/UI/Button/Button'
import { fetchMe } from '@/service/me'
import useAuth from '@/hooks/useAuth'

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

const skillSchema: SchemaOf<SkillType> = object({
  id: string().nullable(),
  name: string().required('Enter a skill name'),
  level: string().required('Select a skill level')
})

const schema: SchemaOf<SkillsType> = object().shape({
  skills: array().of(skillSchema).optional()
})

const SkillsAddForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const { authFetch } = useAuth()
  const { isLoading, data: levels } = useQuery<GenericDataList[], { message?: string }>(
    Query.SkillLevels,
    fetchSkillLevels,
    { staleTime: Infinity }
  )

  const { isFetched: isFetchedMe, data: dataMe } = useQuery<RegisterUserResponse>(
    Query.Me,
    () => authFetch(fetchMe)
  )

  const { isLoading: isLoadingSkills, data: skillsList } = useQuery<
    string[],
    { message?: string }
  >(Query.Skills, fetchSkills, {
    staleTime: Infinity
  })

  const methods = useForm<SkillsType>({
    defaultValues: { skills: [] },
    resolver: yupResolver(schema)
  })

  const { control, handleSubmit, setValue } = methods

  const { fields, append, remove } = useFieldArray<SkillsType, 'skills', 'name'>({
    control,
    name: 'skills'
    // keyName: 'name'
  })

  useEffect(() => {
    append({ name: '', level: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disableOptions = useMemo(
    () => [
      ...fields.map(({ name }) => name),
      ...(isFetchedMe ? dataMe.skills.map(({ name }) => name) : [])
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
            <>
              {fields.map((_item, index) => (
                <Row key={index}>
                  <Controller
                    name={`skills.${index}.name`}
                    control={control}
                    render={({ field: { name }, fieldState: { error } }) => (
                      <CreatableAutocomplete
                        loading={isLoadingSkills}
                        disableOptions={disableOptions}
                        label="Enter a skill"
                        data={(skillsList || []).map((skill) => ({ title: skill }))}
                        onSelected={(_event, { title }) => setValue(name, title)}
                        size="small"
                        error={!!error}
                        helperText={!!error && error.message}
                      />
                    )}
                  />

                  <Controller
                    name={`skills.${index}.level` as `skills.${number}`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Box className="radio-options">
                        <RadioGroup {...field}>
                          {levels.map(({ name: title }) => (
                            <FormControlLabel
                              key={title}
                              control={<Radio />}
                              label={title}
                              value={title}
                            />
                          ))}
                        </RadioGroup>
                        {!!error && (
                          <FormHelperText error>{error.message}</FormHelperText>
                        )}
                      </Box>
                    )}
                  />

                  <IconButton
                    className="button-remove"
                    aria-label="Remove"
                    title="Remove"
                    onClick={() => remove(index)}
                  >
                    <Icon icon="circle-delete" />
                  </IconButton>
                </Row>
              ))}
            </>
          )
        )}

        <Field>
          <Button
            sx={{ color: 'text.primary' }}
            variant="text"
            startIcon={<Icon icon="circle-plus" />}
            onClick={() => {
              append({ name: '', level: '' })
            }}
          >
            Add another skill
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

export default SkillsAddForm
