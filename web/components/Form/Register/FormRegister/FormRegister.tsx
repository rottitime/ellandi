import { useUiContext } from '@/context/UiContext'
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
  loading,
  error
}) => {
  const { setLoading, setError } = useUiContext()
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = useFormContext()

  useEffect(() => {
    reset({
      grade: '',
      grade_other: '',
      ...defaultValues
    })
  }, [reset, defaultValues])

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  useEffect(() => {
    setError(error)
  }, [setError, error])

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
