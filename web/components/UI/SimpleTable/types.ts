import { TableCell } from '@mui/material'
import { ComponentProps, ReactElement, ReactNode } from 'react'

type DataRow = ComponentProps<typeof TableCell>

export type Props = {
  loading?: boolean
  headers?: DataRow[]
  list: DataRow[][]
  body?: ReactNode
}
