import ConditionalWrapper from '@/components/ConditionalWrapper/ConditionalWrapper'
import TextField from '@/components/Form/TextField/TextField'
import { Box, styled } from '@mui/material'
import { FC, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Props } from './types'

const SubField = styled(Box)`
  border-left: 2px solid ${(p) => p.theme.colors.grey2};
  padding-left: ${(p) => p.theme.spacing(2)};
  display: flex;
  align-items: center;
  position: relative;
`

const TextFieldControlled: FC<Props> = ({
  label,
  subfield,
  onChange,
  name,
  ...props
}) => {
  const { control, setValue, trigger, setError } = useFormContext()

  useEffect(() => {
    return () => {
      //bug fix: force react-form-hook update 'isValid'
      setValue(name, '')
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ConditionalWrapper
      condition={subfield}
      wrapper={(children) => <SubField>{children}</SubField>}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={label}
            value={field.value || ''}
            variant="outlined"
            size="small"
            error={!!error}
            data-testid={`field_${name}`}
            helperText={error?.message ? <>{error.message}</> : null}
            fullWidth
            inputProps={{ 'data-testid': `textfield_${name}` }}
            {...props}
            onChange={(e) => {
              if (typeof onChange === 'function') onChange(e)
              field.onChange(e)
            }}
          />
        )}
      />
    </ConditionalWrapper>
  )
}

export default TextFieldControlled
