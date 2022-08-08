import Link from '@/components/UI/Link'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography
} from '@mui/material'
import { boolean, object, SchemaOf } from 'yup'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { PrivacyAcceptType } from '@/service/types'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const schema: SchemaOf<PrivacyAcceptType> = object().shape({
  privacy_policy_agreement: boolean()
    .required()
    .oneOf([true], 'You must accept the privacy policy')
})

const PrivacyForm: FC<StandardRegisterProps<PrivacyAcceptType>> = (props) => {
  const methods = useForm<PrivacyAcceptType>({
    defaultValues: { privacy_policy_agreement: false },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography gutterBottom>
          <Link href="/help/privacy-notice" target="_tab">
            Privacy policy (opens in a new tab)
          </Link>
        </Typography>

        <FormGroup>
          <Controller
            name="privacy_policy_agreement"
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <>
                <FormControlLabel
                  control={<Checkbox checked={field.value} {...field} />}
                  label="I agree to the privacy policy"
                />
                {error && <FormHelperText error>{error.message}</FormHelperText>}
              </>
            )}
          />
        </FormGroup>
      </Form>
    </FormProvider>
  )
}

export default PrivacyForm
