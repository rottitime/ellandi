import { string, ref, boolean } from 'yup'

export const minPassword = 8

const email = string()
  .transform((v) => {
    return v.toLowerCase()
  })
  .email('Enter an email address in the correct format, like name@example.com')
  .required('This is a required field')

const emailConfirm = string()
  .transform((v) => {
    return v.toLowerCase()
  })
  .oneOf([ref('email'), null], 'Does not match with email')
  .required('Enter your email address again to confirm')

const password = string()
  .min(minPassword, `Password must be ${minPassword} characters or more`)
  .required('Enter your password')

const passwordConfirm = string()
  .oneOf([ref('password'), null], 'Passwords do not match')
  .required('Enter your new password again to confirm')

const privacyPolicyAgreement = boolean()
  .required()
  .oneOf([true], 'You must accept the privacy policy')

const requiredField = string().required('This is a required field')

export const schema = {
  email,
  emailConfirm,
  password,
  passwordConfirm,
  privacyPolicyAgreement,
  requiredField
}
