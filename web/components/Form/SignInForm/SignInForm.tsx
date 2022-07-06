import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'

const SignInForm = () => {
  return (
    <>
      <TextFieldControlled
        name="email"
        type="email"
        label="Email address"
        placeholder="e.g. Joe.Bloggs@gmail.com"
      />

      <TextFieldControlled name="password" type="password" label="Password" />
    </>
  )
}

export default SignInForm
