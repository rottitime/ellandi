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
  loading
}) => {
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = useFormContext()

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      {children}
      <FormFooter
        skipUrl={skipUrl}
        backUrl={backUrl}
        buttonProps={{ loading, disabled: submitDisabled && !isDirty && !isValid }}
      />
    </form>
  )
}

export default FormRegister
