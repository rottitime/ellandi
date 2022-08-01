import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { fetchGrades, GenericDataList, GradeType, Query } from '@/service/api'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from '../types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const schema: SchemaOf<GradeType> = object().shape({
  grade: string().nullable().required('This field is required'),
  grade_other: string()
    .nullable()
    .when('grade', (grade) => {
      if (grade === 'Other') return string().required('This is a required field')
    })
})

const GradeForm: FC<StandardRegisterProps<GradeType>> = (props) => {
  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Grades,
    fetchGrades
  )

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography variant="subtitle1" gutterBottom>
          Select your grade. You may only choose one
        </Typography>

        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" aria-busy={isLoading} {...field}>
              {isLoading
                ? [...Array(5).keys()].map((i) => (
                    <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
                  ))
                : data.map(({ name }) => (
                    <FormControlLabel
                      key={name}
                      control={<Radio />}
                      label={name}
                      value={name}
                    />
                  ))}
            </RadioGroup>
          )}
        />

        {watchFields.grade === 'Other' && (
          <TextFieldControlled name="grade_other" label="Enter grade" />
        )}
      </Form>
    </FormProvider>
  )
}

export default GradeForm
