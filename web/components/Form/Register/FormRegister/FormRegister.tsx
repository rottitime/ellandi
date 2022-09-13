import React, { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import FormFooter from '../../FormFooter'
import { Props } from './types'

const FormRegister: FC<Props> = ({
  submitDisabled = false,
  onFormSubmit,
  defaultValues,
  children,
  skipUrl,
  backUrl,
  buttonLoading,
  ...props
}) => {
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = useFormContext()

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [reset, defaultValues])

  const filteredProps = { ...props }
  delete filteredProps.pickFields

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate {...filteredProps}>
      {children}
      <FormFooter
        skipUrl={skipUrl}
        backUrl={backUrl}
        buttonProps={{
          loading: buttonLoading,
          disabled: submitDisabled && !isDirty && !isValid
        }}
      />
    </form>
  )
}

export default FormRegister
