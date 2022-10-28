import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC, useId } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, array } from 'yup'
import FormFooter from '../FormFooter'
import { Collapse, Radio, Typography } from '@mui/material'
import { Props, ReviewFields, SchemaType } from './types'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Tooltip from '@/components/UI/Tooltip/Tooltip'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'

const skillSchema: SchemaOf<ReviewFields> = object({
  id: string(),
  name: string(),
  approve: string().nullable(),
  comment: string().nullable()
})

const schema: SchemaOf<SchemaType> = object().shape({
  reviewed: array().of(skillSchema).optional()
})

const options = ['Yes', 'No']

const SkillsReview: FC<Props> = ({ data, onFormSubmit }) => {
  const id = useId()
  const labelId = `label-${id}-`
  const methods = useForm<SchemaType>({
    defaultValues: {
      reviewed: data.map(({ id, name }) => ({ id, name, approve: null, comment: null }))
    },
    resolver: yupResolver(schema)
  })

  const { control, watch } = methods
  const watchFields = watch()

  return (
    <AccountCard
      color="brandSkills"
      headerLogo="skills"
      header={
        <Typography variant="h2">
          Pending skills
          <Tooltip
            brandColor="brandSkills"
            title="Custom skills that have been added by your team. If you reject a skill it will be removed from the employee's record"
          />
        </Typography>
      }
      headerColorInherit
      data-testid="review-skills"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(({ reviewed }) => onFormSubmit(reviewed))}
          noValidate
        >
          <SimpleTable
            list={[]}
            headers={[
              { children: null },
              ...options.map((children) => ({
                children,
                id: `${labelId}${children}`
              })),
              { children: null }
            ]}
          >
            {data.map((skill, i) => {
              return (
                <tr key={skill.id}>
                  <Typography variant="body2" component="td">
                    {skill.name}
                  </Typography>

                  {options.map((label) => (
                    <td key={label}>
                      <Controller
                        name={`reviewed.${i}.approve`}
                        control={control}
                        render={({ field }) => (
                          <Radio
                            {...field}
                            value={label}
                            checked={field.value === label}
                            data-testid={`radio-${i}-${label.toLowerCase()}`}
                            inputProps={{
                              'aria-labelledby': `${labelId}${label}`,
                              'aria-label': label
                            }}
                          />
                        )}
                      />
                    </td>
                  ))}
                  <td>
                    <Collapse in={watchFields.reviewed[i].approve === options[1]}>
                      <TextFieldControlled
                        aria-hidden={watchFields.reviewed[i].approve !== options[1]}
                        name={`reviewed.${i}.comment`}
                        label="Add a comment (optional)"
                        multiline
                        rows={3}
                      />
                    </Collapse>
                  </td>
                </tr>
              )
            })}
          </SimpleTable>

          <FormFooter buttonProps={{ fullWidth: true }} submitText="Submit" />
        </form>
      </FormProvider>
    </AccountCard>
  )
}

export default SkillsReview
