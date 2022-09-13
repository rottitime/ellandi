import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { ContractType, GenericDataList, Query } from '@/service/types'
import { useQuery } from 'react-query'
import { fetchContractTypes } from '@/service/api'
import { FC, useEffect } from 'react'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { StandardRegisterProps } from './types'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { useProfile } from '@/hooks/useProfile'

const schema: SchemaOf<ContractType> = object().shape({
  contract_type: string().required('This is a required field'),
  contract_type_other: string()
    .nullable()
    .when('contract_type', (functionType) => {
      if (functionType === 'Other')
        return string().nullable().required('This is a required field')
    })
})

const ContractTypeForm: FC<StandardRegisterProps<ContractType>> = (props) => {
  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.ContractTypes,
    fetchContractTypes,
    {
      staleTime: Infinity
    }
  )

  const methods = useForm<ContractType>({
    defaultValues: {
      contract_type: '',
      contract_type_other: ''
    },
    resolver: yupResolver(schema)
  })

  const { control, watch, setValue } = methods

  const watchFields = watch()

  useEffect(() => {
    if (!!watchFields.contract_type_other) setValue('contract_type', 'Other')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Select your contract type. You may only choose one
        </Typography>

        <Controller
          name="contract_type"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              {isLoading
                ? [...Array(4).keys()].map((i) => (
                    <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
                  ))
                : data.map(({ name }) => (
                    <Box key={name}>
                      <FormControlLabel control={<Radio />} label={name} value={name} />
                      {name === 'Other' && watchFields.contract_type === 'Other' && (
                        <TextFieldControlled
                          name="contract_type_other"
                          label="Enter contract type"
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

export default ContractTypeForm

export const UpdateContractTypeForm = ({ callback }: { callback?: () => void }) => {
  const { mutate, userProfile } = useProfile<ContractType>({
    callback
  })

  return (
    <ContractTypeForm
      onFormSubmit={(data) => {
        mutate({
          contract_type: data.contract_type,
          contract_type_other: data.contract_type_other
        })
      }}
      backUrl={null}
      defaultValues={{
        contract_type: userProfile.contract_type,
        contract_type_other: userProfile.contract_type_other
      }}
    />
  )
}
