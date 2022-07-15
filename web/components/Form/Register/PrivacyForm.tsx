import Link from '@/components/UI/Link'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography
} from '@mui/material'
import { boolean, object, SchemaOf } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { PrivacyAcceptType } from '@/service/types'

const schema: SchemaOf<PrivacyAcceptType> = object().shape({
  privacy_policy_agreement: boolean()
    .required()
    .oneOf([true], 'You must accept the privacy policy')
})

const PrivacyForm: FC<StandardRegisterProps<PrivacyAcceptType>> = ({
  backUrl,
  onFormSubmit
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<PrivacyAcceptType>({
    defaultValues: { privacy_policy_agreement: false },
    resolver: yupResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography gutterBottom>
        <Link href="#">Privacy policy (opens in a new tab)</Link>
      </Typography>

      <FormGroup sx={{ mb: 5 }}>
        <Controller
          name="privacy_policy_agreement"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormControlLabel
                control={<Checkbox {...field} />}
                label="I agree to the privacy policy"
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
      </FormGroup>

      <FormFooter
        backUrl={backUrl}
        buttonProps={{
          disabled: !isDirty && !isValid
        }}
      />
    </form>
  )
}

export default PrivacyForm
