import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { FC, useId } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import { PrimaryProfessionType, ProfessionType } from '@/service/api'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import { Field } from '../Field/Field'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import data from '@/prefetch/professions.json'

const schema: SchemaOf<PrimaryProfessionType> = object().shape({
  primary_profession: string().required('Enter your profession'),
  profession_other: string()
    .nullable()
    .when('primary_profession', (value) => {
      if (value === 'Other')
        return string().nullable().required('This is a required field')
    })
})

const PrimaryProfessionForm: FC<
  StandardRegisterProps<PrimaryProfessionType, ProfessionType>
> = (props) => {
  const id = useId()
  const labelId = `label-${id}`
  const label = 'Primary profession'

  const methods = useForm<PrimaryProfessionType>({
    defaultValues: { primary_profession: '', profession_other: '' },
    resolver: yupResolver(schema)
  })

  const { control, watch } = methods
  const watchFields = watch()

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
            defaultValue=""
            render={({ field }) => (
              <>
                <FormControl fullWidth size="small">
                  <InputLabel id={labelId}>{label}</InputLabel>
                  <Select {...field} labelId={labelId} label={label}>
                    {[...data, { order: data.length, name: "I don't know" }].map(
                      ({ name }) => (
                        <MenuItem value={name} key={name}>
                          {name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                {watchFields.primary_profession === 'Other' && (
                  <Box sx={{ my: 3 }}>
                    <TextFieldControlled
                      name="profession_other"
                      label="Enter profession"
                      subfield
                    />
                  </Box>
                )}
              </>
            )}
          />
        </Field>
      </Form>
    </FormProvider>
  )
}

export default PrimaryProfessionForm
