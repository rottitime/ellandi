import { IconButton, styled } from '@mui/material'
import { Query, SkillDevelopType, SkillsDevelopType } from '@/service/types'
import { fetchSkills } from '@/service/api'
import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props } from './types'
import CreatableAutocomplete from '../../CreatableAutocomplete/CreatableAutocomplete'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/UI/Button/Button'

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

const skillSchema: SchemaOf<SkillDevelopType> = object({
  id: string().nullable(),
  name: string().required('This is required')
})

const schema: SchemaOf<SkillsDevelopType> = object().shape({
  skills_develop: array().of(skillSchema).optional()
})

const SkillsDevelopAddForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const { isLoading: isLoadingSkills, data: skillsList } = useQuery<
    string[],
    { message?: string }
  >(Query.Skills, fetchSkills, { staleTime: Infinity })

  const methods = useForm<SkillsDevelopType>({
    defaultValues: { skills_develop: [] },
    resolver: yupResolver(schema)
  })

  const { control, handleSubmit, setValue } = methods

  const { fields, append, remove } = useFieldArray<
    SkillsDevelopType,
    'skills_develop',
    'name'
  >({
    control,
    name: 'skills_develop',
    keyName: 'name'
  })

  useEffect(() => {
    append({ name: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        {!!fields.length &&
          fields.map((_item, index) => (
            <Row key={index}>
              <Controller
                name={`skills_develop.${index}.name` as `skills_develop.${number}`}
                control={control}
                render={({ fieldState: { error } }) => (
                  <CreatableAutocomplete
                    loading={isLoadingSkills}
                    disableOptions={fields.map(({ name }) => name)}
                    label="Ener a skill"
                    data={
                      isLoadingSkills ? [] : skillsList.map((skill) => ({ title: skill }))
                    }
                    onSelected={
                      async (_event, values) =>
                        setValue(`skills_develop.${index}.name`, values?.title)
                      // setValue(name, title)
                    }
                    size="small"
                    error={!!error}
                    helperText={!!error && error.message}
                  />
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

        <Field>
          <Button
            sx={{ color: 'text.primary' }}
            variant="text"
            startIcon={<Icon icon="circle-plus" />}
            onClick={() => {
              append({ name: '' })
            }}
          >
            Add another skill
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

export default SkillsDevelopAddForm
