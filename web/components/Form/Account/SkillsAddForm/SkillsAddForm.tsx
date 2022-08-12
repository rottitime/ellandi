import {
  Button,
  FormHelperText,
  IconButton,
  Skeleton,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
  Box
} from '@mui/material'
import { GenericDataList, Query, SkillsType, SkillType } from '@/service/types'
import { fetchSkillLevels, fetchSkills } from '@/service/api'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Props } from './types'
import CreatableAutocomplete from '../../CreatableAutocomplete/CreatableAutocomplete'
import Icon from '@/components/Icon/Icon'

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
  name: string().required('This is required'),
  level: string().required('This is required')
})

const schema: SchemaOf<SkillsType> = object().shape({
  skills: array().of(skillSchema).optional()
})

const SkillsAddForm: FC<Props> = ({ onFormSubmit }) => {
  const { isLoading, data: levels } = useQuery<GenericDataList[], { message?: string }>(
    Query.SkillLevels,
    fetchSkillLevels,
    { staleTime: Infinity }
  )

  const { isLoading: isLoadingSkills, data: skillsList } = useQuery<
    string[],
    { message?: string }
  >(Query.Skills, fetchSkills, { staleTime: Infinity })

  const methods = useForm<SkillsType>({
    defaultValues: { skills: [] },
    resolver: yupResolver(schema)
  })

  const { control, handleSubmit, setValue } = methods

  const { fields, append, remove } = useFieldArray<SkillsType, 'skills', 'name'>({
    control,
    name: 'skills',
    keyName: 'name'
  })

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
                    name={`skills.${index}.name` as `skills.${number}`}
                    control={control}
                    render={({ fieldState: { error } }) => (
                      <CreatableAutocomplete
                        loading={isLoadingSkills}
                        disableOptions={fields.map(({ name }) => name)}
                        label="Ener a skill"
                        data={
                          isLoading ? [] : skillsList.map((skill) => ({ title: skill }))
                        }
                        onSelected={
                          async (_event, values) =>
                            setValue(`skills.${index}.name`, values?.title)
                          // setValue(name, title)
                        }
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
            Add another skilluage
          </Button>
        </Field>
        <Field textAlign="right">
          <Button type="submit" variant="contained">
            Submit skills
          </Button>
        </Field>
      </form>
    </FormProvider>
  )
}

export default SkillsAddForm
