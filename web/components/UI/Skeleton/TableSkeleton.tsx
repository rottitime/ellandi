import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { ComponentProps, FC } from 'react'
import Skeleton from '@/components/UI/Skeleton/Skeleton'

type Props = {
  rows?: number
  columns?: number
} & ComponentProps<typeof Table>

const TableSkeleton: FC<Props> = ({ rows = 4, columns = 3, ...props }) => (
  <Table {...props}>
    <TableHead>
      <TableRow>
        {[...Array(columns).keys()].map((i) => (
          <TableCell key={i}>
            <Skeleton animation="wave" />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {[...Array(rows).keys()].map((i) => (
        <TableRow key={i}>
          {[...Array(columns).keys()].map((i) => (
            <TableCell key={i}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default TableSkeleton
