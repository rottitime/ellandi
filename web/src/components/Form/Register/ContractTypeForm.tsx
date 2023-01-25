import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { ContractType } from '@/service/types'
import { FC, useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { StandardRegisterProps } from './types'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import data from '@/prefetch/contract-types.json'

const schema: SchemaOf<ContractType> = object().shape({
  contract_type: string().required('Enter your contract type'),
  contract_type_other: string()
    .nullable()
    .when('contract_type', (functionType) => {
      if (functionType === 'Other')
        return string().nullable().required('Enter your contract type')
    })
})

const ContractTypeForm: FC<StandardRegisterProps<ContractType>> = (props) => {
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
  }, [setValue, watchFields])

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
              {data.map(({ name }) => (
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
