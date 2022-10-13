import { FormHelperText, IconButton, Radio, styled } from '@mui/material'
import {
  GenericDataList,
  Query,
  RegisterUserResponse,
  SkillsType,
  SkillType
} from '@/service/types'
import { fetchSkillLevels, fetchSkills } from '@/service/api'
import { forwardRef, useId, useImperativeHandle, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props, RefHandler } from './types'
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

const SkillsAddForm = forwardRef<RefHandler, Props>(
  ({ onFormSubmit, loading, showAll, suggestionProps, hideSubmit }, ref) => {
    const id = useId()
    const { authFetch } = useAuth()
    const [hasSelected, setHasSelected] = useState(false)

    const { isLoading, data: levels } = useQuery<GenericDataList[], { message?: string }>(
      Query.SkillLevels,
      fetchSkillLevels,
      { initialData: [], staleTime: 0 }
    )

    const { isFetched: isFetchedMe, data: dataMe } = useQuery<RegisterUserResponse>(
      Query.Me,
      () => authFetch(fetchMe)
    )

    const { isLoading: isLoadingSkills, data: skillsList } = useQuery<
      string[],
      { message?: string }
    >(Query.Skills, fetchSkills, { initialData: [], staleTime: 0 })

    const methods = useForm<SkillsType>({
      defaultValues: { skills: [{ name: '', level: '' }] },
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
                render={({ field, fieldState: { error } }) => (
                  <CreatableAutocomplete
                    {...field}
                    loading={isLoadingSkills}
                    disableOptions={disableOptions}
                    label="Enter a skill"
                    options={(skillsList || []).map((skill) => ({ title: skill }))}
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
              name={`skills.${index}.level`}
              control={control}
              render={({ field }) => (
                <Radio
                  {...field}
                  value={name}
                  inputProps={{
                    'aria-labelledby': `${id}-th-${slug}`,
                    'aria-label': name
                  }}
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
              disabled={fields.length === 1}
              onClick={() => {
                console.log({ index })
                // debugger
                remove(index)
              }}
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
      skillsList,
      errors,
      id
    ])

    useImperativeHandle(ref, () => ({
      submitForm: () => handleSubmit(onFormSubmit)()
    }))

    return (
      <FormProvider {...methods}>
        <SkillsSuggest
          sx={{ mb: 4 }}
          type="default"
          hideOptions={disableOptions}
          onFetched={(data) => {
            if (!showAll && !data.length) onFormSubmit({ skills: [] })
          }}
          onSelected={(name) => {
            const firstRow = getValues('skills.0')
            setHasSelected(true)
            return !firstRow.name && !firstRow.level
              ? setValue('skills.0.name', name)
              : append({ name, level: '' })
          }}
          {...suggestionProps}
        />

        {(showAll || !!hasSelected) && (
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            <Table
              loading={isLoading}
              list={[]}
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
              body={fields.map(
                (item, index) => (
                  <tr key={item.id}>
                    <td>
                      <Controller
                        name={`skills.${index}.name`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CreatableAutocomplete
                            {...field}
                            loading={isLoadingSkills}
                            disableOptions={disableOptions}
                            label="Enter a skill"
                            options={(skillsList || []).map((skill) => ({
                              title: skill
                            }))}
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
                    </td>
                    <td>
                      <IconButton
                        className="button-remove"
                        aria-label="Remove"
                        title="Remove"
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                      >
                        <Icon icon="circle-delete" />
                      </IconButton>
                    </td>
                  </tr>
                )

                //   [
                //   {

                //   ...levels.map(({ name, slug }) => ({
                //     children: (
                //       <Controller
                //         name={`skills.${index}.level`}
                //         control={control}
                //         render={({ field }) => (
                //           <Radio
                //             {...field}
                //             value={name}
                //             inputProps={{
                //               'aria-labelledby': `${id}-th-${slug}`,
                //               'aria-label': name
                //             }}
                //             checked={field.value === name}
                //           />
                //         )}
                //       />
                //     )
                //   })),

                //   {
                //     children: (
                //       <IconButton
                //         className="button-remove"
                //         aria-label="Remove"
                //         title="Remove"
                //         disabled={fields.length === 1}
                //         onClick={() => {
                //           console.log({ index })
                //           // debugger
                //           remove(index)
                //         }}
                //       >
                //         <Icon icon="circle-delete" />
                //       </IconButton>
                //     )
                //   }
                // ]
              )}
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
            {!hideSubmit && (
              <Field textAlign="right">
                <Button type="submit" variant="contained" loading={loading}>
                  Save skills
                </Button>
              </Field>
            )}
          </form>
        )}
      </FormProvider>
    )
  }
)

SkillsAddForm.displayName = 'SkillsAddForm'

export default SkillsAddForm
