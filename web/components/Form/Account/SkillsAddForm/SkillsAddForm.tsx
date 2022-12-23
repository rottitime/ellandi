import { Box, FormHelperText, IconButton, Radio, styled } from '@mui/material'
import { Query, RegisterUserResponse, SkillsType, SkillType } from '@/service/types'
import { fetchSkills } from '@/service/api'
import { forwardRef, useId, useImperativeHandle, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, boolean, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props, RefHandler } from './types'
import CreatableAutocomplete from '../../CreatableAutocomplete/CreatableAutocomplete'
import SkillsSuggest from '@/components/UI/SkillsSuggest/SkillsSuggest'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/UI/Button/Button'
import { fetchMe } from '@/service/me'
import useAuth from '@/hooks/useAuth'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import Tooltip from '@/components/UI/Tooltip/Tooltip'
import levels from '@/prefetch/skill-levels.json'

const Table = styled(SimpleTable)`
  th,
  td {
    text-align: center;
  }
`

const skillSchema: SchemaOf<SkillType> = object({
  id: string().nullable(),
  pending: boolean().nullable(),
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

    const { isFetched: isFetchedMe, data: dataMe } = useQuery<RegisterUserResponse>(
      Query.Me,
      () => authFetch(fetchMe)
    )

    const { isLoading: isLoadingSkills, data: skillsList } = useQuery<
      string[],
      { message?: string }
    >(Query.Skills, fetchSkills, { initialData: [], staleTime: 0 })

    const methods = useForm<SkillsType>({
      defaultValues: { skills: showAll ? [{ name: '', level: '' }] : [] },
      resolver: yupResolver(schema)
    })

    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
      getValues,
      watch
    } = methods
    const watchAllFields = watch()

    const { fields, append, remove } = useFieldArray<SkillsType, 'skills', 'name'>({
      control,
      name: 'skills'
    })

    const disableOptions = useMemo(
      () => [
        ...watchAllFields.skills.map(({ name }) => name),
        ...(isFetchedMe ? dataMe.skills.map(({ name }) => name) : [])
      ],
      [watchAllFields, isFetchedMe, dataMe]
    )

    useImperativeHandle(ref, () => ({
      submitForm: () => handleSubmit(onFormSubmit)()
    }))

    return (
      <FormProvider {...methods}>
        <Box
          sx={{
            display: {
              xs: 'flex',
              lg: 'grid'
            },
            columnGap: {
              xs: 0,
              lg: '16px'
            }
          }}
          style={{
            flexDirection: 'column',
            gridTemplateColumns: 'auto auto'
          }}
          data-testid="skillsadd-form"
        >
          {suggestionProps?.length > 0 &&
            suggestionProps.map((group) => {
              return (
                <SkillsSuggest
                  key={`${group.groupId}-${disableOptions.length}`}
                  sx={{ mb: 4 }}
                  {...group}
                  hideOptions={disableOptions}
                  onSelected={(name) => {
                    const firstRow = getValues('skills.0')
                    setHasSelected(true)

                    if (!showAll) {
                      append({ name, level: '' })
                    } else {
                      !firstRow?.name && !firstRow?.level
                        ? setValue('skills.0.name', name)
                        : append({ name, level: '' })
                    }
                  }}
                />
              )
            })}
        </Box>

        {(showAll || !!hasSelected) && (
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            <Table
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
            >
              {fields.map((item, index) => (
                <tr key={`${item.id}-${fields.length}`}>
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
                          testid={`skillname-${index}`}
                        />
                      )}
                    />
                    {errors?.['skills']?.[index]?.['level'] && (
                      <FormHelperText error>
                        {errors?.['skills']?.[index]?.['level']?.message}
                      </FormHelperText>
                    )}
                  </td>

                  {levels.map(({ name, slug }) => (
                    <td key={slug}>
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
                    </td>
                  ))}

                  <td>
                    <IconButton
                      className="button-remove"
                      aria-label="Remove"
                      title="Remove"
                      data-testid={`delete-${index}`}
                      disabled={showAll && fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      <Icon icon="circle-delete" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </Table>

            <Field>
              <Button
                sx={{ color: 'text.primary' }}
                variant="text"
                startIcon={<Icon icon="circle-plus" />}
                data-testid="append"
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
