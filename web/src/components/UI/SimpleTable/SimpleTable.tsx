import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import {
  TableBody,
  TableCell,
  TableRow,
  Table as MuiTable,
  styled,
  TableHead
} from '@mui/material'
import { FC } from 'react'
import Typography from '../Typography/Typography'
import { Props } from './types'

const Table = styled(MuiTable)`
  th {
    font-weight: 700;
    font-size: 16px;
  }
  th,
  td {
    padding: ${(p) => p.theme.spacing(3, 0)};
  }
`

const SimpleTable: FC<Props> = ({
  list = [],
  headers,
  loading,
  children,
  noRowContent,
  ...props
}) => {
  const hasItems = Array.isArray(list) && !!list.length

  if (loading) return <TableSkeleton />

  if (!!noRowContent && !hasItems)
    return (
      <Typography variant="body2" data-testid="simpletable-empty-rows">
        {noRowContent}
      </Typography>
    )

  return (
    <Table size="small" {...props}>
      {headers && (
        <TableHead>
          <TableRow>
            {headers.map((cell, i) => (
              <TableCell {...cell} key={i} />
            ))}
          </TableRow>
        </TableHead>
      )}

      <TableBody>
        {children}
        {Array.isArray(list) &&
          list.map((item, i) => (
            <TableRow key={i}>
              {item.map((cell, i) => (
                <TableCell {...cell} key={i} />
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default SimpleTable
export * from './types'
