import ContolledTextField from '@/components/Form/ContolledTextField'

const SignInForm = () => {
  return (
    <>
      <ContolledTextField
        name="email"
        type="email"
        label="Email address"
        placeholder="e.g. Joe.Bloggs@gmail.com"
      />

      <ContolledTextField name="password" type="password" label="Password" />
    </>
  )
}

export default SignInForm
