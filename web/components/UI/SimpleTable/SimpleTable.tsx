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

const SimpleTable: FC<Props> = ({ list = [], headers, loading, body, ...props }) =>
  loading ? (
    <TableSkeleton />
  ) : (
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
        {body}
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

export default SimpleTable
export * from './types'
