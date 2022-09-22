import { string, ref, boolean } from 'yup'

export const minPassword = 8

const email = string()
  .email('Enter an email address in the correct format, like name@example.com')
  .required('This is a required field')

const emailConfirm = string()
  .oneOf([ref('email'), null], 'Does not match with email')
  .required('This is a required field')

const password = string()
  .min(minPassword, `Password must be ${minPassword} characters or more`)
  .max(20)
  .required('This is a required field')

const passwordConfirm = string()
  .oneOf([ref('password'), null], 'Does not match with password')
  .required('This is a required field')

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
