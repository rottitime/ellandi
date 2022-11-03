import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'
import { Pagination as MuiPagination } from '@mui/material'

const Pagination = () => {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <MuiPagination
      count={pageCount}
      page={page + 1}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

export default Pagination
