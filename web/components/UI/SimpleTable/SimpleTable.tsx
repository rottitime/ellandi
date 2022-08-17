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
    width: 29%;
  }
  th,
  td {
    padding: ${(p) => p.theme.spacing(3, 0)};
  }
`

const SimpleTable: FC<Props> = ({ list = [], headers, loading }) =>
  loading ? (
    <TableSkeleton />
  ) : (
    <Table size="small">
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
