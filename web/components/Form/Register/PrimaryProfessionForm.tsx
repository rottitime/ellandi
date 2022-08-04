import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FC, useEffect, useMemo } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import {
  PrimaryProfessionType,
  ProfessionType,
  Query,
  RegisterUserResponse
} from '@/service/api'
import { useQuery } from 'react-query'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import router from 'next/router'

const schema: SchemaOf<PrimaryProfessionType> = object().shape({
  primary_profession: string().required('This is a required field')
})

const PrimaryProfessionForm: FC<
  StandardRegisterProps<PrimaryProfessionType, ProfessionType>
> = (props) => {
  const { authFetch } = useAuth()

  const methods = useForm<PrimaryProfessionType>({
    defaultValues: { primary_profession: '' },
    resolver: yupResolver(schema)
  })
  const { control } = methods

  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  const professions = useMemo(() => data?.professions || [], [data])

  useEffect(() => {
    if (!isLoading && professions.length < 2) router.push(props.backUrl, undefined)
  }, [professions, isLoading, props.backUrl])

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography variant="subtitle1" gutterBottom>
          Select your main profession. You may only choose one
        </Typography>

        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        {!isLoading && !!professions.length && (
          <Controller
            name="primary_profession"
            control={control}
            render={({ field }) => (
              <RadioGroup aria-live="polite" name="primary_profession" {...field}>
                {professions.map((name) => (
                  <FormControlLabel
                    key={name}
                    control={<Radio />}
                    label={name}
                    value={name}
                    disabled={professions.length === 1}
                  />
                ))}
              </RadioGroup>
            )}
          />
        )}
      </Form>
    </FormProvider>
  )
}

export default PrimaryProfessionForm
