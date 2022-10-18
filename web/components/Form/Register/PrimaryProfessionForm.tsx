import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { FC, useId } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import {
  fetchProfessions,
  GenericDataList,
  PrimaryProfessionType,
  ProfessionType,
  Query
} from '@/service/api'
import { useQuery } from 'react-query'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { Field } from '../Field/Field'

const schema: SchemaOf<PrimaryProfessionType> = object().shape({
  primary_profession: string().required('This is a required field')
})

const PrimaryProfessionForm: FC<
  StandardRegisterProps<PrimaryProfessionType, ProfessionType>
> = (props) => {
  const id = useId()
  const labelId = `label-${id}`
  const label = 'Primary profession'

  const { data, isSuccess } = useQuery<GenericDataList[], { message?: string }>(
    Query.Professions,
    fetchProfessions,
    { staleTime: Infinity }
  )

  const methods = useForm<PrimaryProfessionType>({
    defaultValues: { primary_profession: null },
    resolver: yupResolver(schema)
  })
  const { control } = methods

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography gutterBottom>
          Select your main profession. You may only choose one but can add other
          professions you belong to on the next page
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Professions are made up of civil servants with particular skills, knowledge or
          expertise to support government functions
        </Typography>

        <Field>
          <Controller
            name="primary_profession"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select {...field} labelId={labelId} label={label} autoFocus>
                  {isSuccess &&
                    data.map(({ name }) => (
                      <MenuItem value={name} key={name}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
        </Field>
      </Form>
    </FormProvider>
  )
}

export default PrimaryProfessionForm
