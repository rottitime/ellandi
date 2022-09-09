import { FormHelperText, IconButton, Radio, styled } from '@mui/material'
import {
  GenericDataList,
  Query,
  RegisterUserResponse,
  SkillsType,
  SkillType
} from '@/service/types'
import { fetchSkillLevels, fetchSkills } from '@/service/api'
import { FC, useEffect, useId, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props } from './types'
import CreatableAutocomplete from '../../CreatableAutocomplete/CreatableAutocomplete'
import SkillsSuggest from '@/components/Account/SkillsSuggest/SkillsSuggest'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/UI/Button/Button'
import { fetchMe } from '@/service/me'
import useAuth from '@/hooks/useAuth'
import SimpleTable, {
  Props as SimpleTableProps
} from '@/components/UI/SimpleTable/SimpleTable'
import Tooltip from '@/components/UI/Tooltip/Tooltip'

const Table = styled(SimpleTable)`
  th,
  td {
    text-align: center;
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
  const id = useId()
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = methods

  const { fields, append, remove } = useFieldArray<SkillsType, 'skills', 'name'>({
    control,
    name: 'skills'
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

  const tableData: SimpleTableProps['list'] = useMemo(() => {
    if (!fields?.length) return []

    const rows = fields.map((_item, index) => [
      {
        children: (
          <>
            <Controller
              name={`skills.${index}.name`}
              control={control}
              render={({ field: { name }, fieldState: { error } }) => (
                <CreatableAutocomplete
                  loading={isLoadingSkills}
                  disableOptions={disableOptions}
                  label="Enter a skill"
                  options={(skillsList || []).map((skill) => ({ title: skill }))}
                  onSelected={(_event, { title }) => setValue(name, title)}
                  size="small"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            {errors?.['skills']?.[index]?.['level'] && (
              <FormHelperText error>
                {errors?.['skills']?.[index]?.['level']?.message}
              </FormHelperText>
            )}
          </>
        )
      },
      ...levels.map(({ name, slug }) => ({
        children: (
          <Controller
            name={`skills.${index}.level` as `skills.${number}.level`}
            control={control}
            render={({ field }) => (
              <Radio
                {...field}
                value={name}
                inputProps={{ 'aria-labelledby': `${id}-th-${slug}`, 'aria-label': name }}
                checked={field.value === name}
              />
            )}
          />
        )
      })),

      {
        children: (
          <IconButton
            className="button-remove"
            aria-label="Remove"
            title="Remove"
            onClick={() => remove(index)}
          >
            <Icon icon="circle-delete" />
          </IconButton>
        )
      }
    ])

    return [...rows]
  }, [
    control,
    disableOptions,
    fields,
    isLoadingSkills,
    levels,
    remove,
    setValue,
    skillsList,
    errors,
    id
  ])

  return (
    <FormProvider {...methods}>
      <SkillsSuggest
        sx={{ mb: 4 }}
        hideOptions={disableOptions}
        onSelected={(name) => {
          const firstRow = getValues('skills.0')
          return !firstRow.name && !firstRow.level
            ? setValue('skills.0.name', name)
            : append({ name, level: '' })
        }}
      />
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Table
          loading={isLoading}
          list={tableData}
          headers={[
            { children: <>&nbsp;</>, width: 227 },
            ...levels.map(({ slug, name, description }) => ({
              children: (
                <span id={`${id}-th-${slug}`}>
                  {name}{' '}
                  {description && (
                    <Tooltip brandColor="brandSkills" title={description} />
                  )}
                </span>
              )
            })),
            { children: <>&nbsp;</> }
          ]}
        />

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
