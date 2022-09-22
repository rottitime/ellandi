import { KeyboardEvent } from 'react'

export type Props = {
  value: number
  error?: boolean
  helperText?: string
  onChange: (value: number) => void
}

export type OnKeyDownType = (e: KeyboardEvent<HTMLInputElement>) => void
