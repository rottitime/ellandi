import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { GradeType } from '@/service/api'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from '../types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import data from '@/prefetch/grades.json'

const schema: SchemaOf<GradeType> = object().shape({
  grade: string().nullable().required('Enter your grade'),
  grade_other: string()
    .nullable()
    .when('grade', (grade) => {
      if (grade === 'Other') return string().nullable().required('Enter your grade')
    })
})

const GradeForm: FC<StandardRegisterProps<GradeType>> = (props) => {
  const methods = useForm<GradeType>({
    defaultValues: {
      grade: '',
      grade_other: ''
    },
    resolver: yupResolver(schema)
  })
  const { control, watch, setValue } = methods

  const watchFields = watch()

  useEffect(() => {
    if (!!watchFields.grade_other) setValue('grade', 'Other')
  }, [setValue, watchFields.grade_other])

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography gutterBottom>Select your grade. You may only choose one</Typography>

        <Typography variant="body2" gutterBottom>
          Grades are the levels at which civil servants work and are paid
        </Typography>

        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" {...field}>
              {data.map(({ name }) => (
                <Box key={name}>
                  <FormControlLabel control={<Radio />} label={name} value={name} />
                  {name === 'Other' && watchFields.grade === 'Other' && (
                    <TextFieldControlled
                      name="grade_other"
                      label="Enter grade"
                      subfield
                    />
                  )}
                </Box>
              ))}
            </RadioGroup>
          )}
        />
      </Form>
    </FormProvider>
  )
}

export default GradeForm
