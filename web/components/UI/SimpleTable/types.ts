import { TableCell } from '@mui/material'
import { ComponentProps } from 'react'

type DataRow = ComponentProps<typeof TableCell>

export type Props = {
  loading?: boolean
  headers?: DataRow[]
  list: DataRow[][]
}
