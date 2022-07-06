import Page, { FormFooter } from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography
} from '@mui/material'
import LinkButton from '@/components/LinkButton'
import { boolean, object, SchemaOf } from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

type PrivacyAcceptType = {
  privacyAccept: boolean
}

const schema: SchemaOf<PrivacyAcceptType> = object().shape({
  privacyAccept: boolean().required().oneOf([true], 'You must accept the privacy policy')
})

const RegisterPage = () => {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<PrivacyAcceptType>({
    defaultValues: { privacyAccept: false },
    resolver: yupResolver(schema)
  })

  const onFormSubmit: SubmitHandler<PrivacyAcceptType> = (data) => {
    // eslint-disable-next-line no-console
    console.log({ data })
    router.push('/register/page5')
  }

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

      <FormFooter>
        <LinkButton href="/register/page3" variant="outlined">
          Back
        </LinkButton>

        <Button type="submit" variant="contained" disabled={!isDirty && !isValid}>
          Continue
        </Button>
      </FormFooter>
    </form>
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Privacy policy" progress={10}>
    {page}
  </Page>
)
