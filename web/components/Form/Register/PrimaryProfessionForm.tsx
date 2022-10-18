import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { FC, useEffect, useId, useMemo } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import {
  fetchProfessions,
  GenericDataList,
  PrimaryProfessionType,
  ProfessionType,
  Query,
  RegisterUserResponse
} from '@/service/api'
import { useQuery } from 'react-query'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import CreatableAutocomplete from '@/components/Form/CreatableAutocomplete/CreatableAutocomplete'
import router from 'next/router'
import { Field } from '../Field/Field'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'

// import { Autocomplete } from '@mui/material'

const schema: SchemaOf<PrimaryProfessionType> = object().shape({
  primary_profession: string().required('This is a required field')
})

const PrimaryProfessionForm: FC<
  StandardRegisterProps<PrimaryProfessionType, ProfessionType>
> = (props) => {
  const id = useId()
  const labelId = `label-${id}`
  const label = 'Primary profession'

  const { data } = useQuery<GenericDataList[], { message?: string }>(
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
                  {data.map(({ name }) => (
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
