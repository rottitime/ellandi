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
  onCancel,
  buttonLoading,
  ...props
}) => {
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = useFormContext()

  //update default values if change later e.g. restrieved from fetch
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [reset, defaultValues])

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate {...props}>
      {children}
      <FormFooter
        skipUrl={skipUrl}
        backUrl={backUrl}
        onCancel={onCancel}
        buttonProps={{
          loading: buttonLoading,
          disabled: submitDisabled && !isDirty && !isValid
        }}
      />
    </form>
  )
}

export default FormRegister
