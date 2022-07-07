import Link from '@/components/UI/Link'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography
} from '@mui/material'
import { boolean, object, SchemaOf } from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import FormFooter from '../FormFooter'

type PrivacyAcceptType = {
  privacyAccept: boolean
}

type Props = {
  onFormSubmit: SubmitHandler<PrivacyAcceptType>
}

const schema: SchemaOf<PrivacyAcceptType> = object().shape({
  privacyAccept: boolean().required().oneOf([true], 'You must accept the privacy policy')
})

const PrivacyForm: FC<Props> = ({ onFormSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<PrivacyAcceptType>({
    defaultValues: { privacyAccept: false },
    resolver: yupResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography gutterBottom>
        <Link href="#">Privacy policy (opens in a new tab)</Link>
      </Typography>

      <FormGroup sx={{ mb: 5 }}>
        <Controller
          name="privacyAccept"
          control={control}
          render={({ field }) => (
            <>
              <FormControlLabel
                control={<Checkbox {...field} />}
                label="I agree to the privacy policy"
              />
              {errors.privacyAccept && (
                <FormHelperText error>{errors.privacyAccept.message}</FormHelperText>
              )}
            </>
          )}
        />
      </FormGroup>

      <FormFooter
        backUrl="/register/page3"
        buttonProps={{
          disabled: !isDirty && !isValid
        }}
      />
    </form>
  )
}

export default PrivacyForm
