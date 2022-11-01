import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import { fetchReportSkills, MeReportSkills, Query } from '@/service/api'
import { Pagination } from '@mui/material'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { Props } from './types'

const SkillsReport: FC<Props> = () => {
  const { authFetch } = useAuth()
  const [page, setPage] = useState(1)
  const { isLoading, data } = useQuery<MeReportSkills>([Query.ReportSkills, page], () =>
    authFetch(fetchReportSkills)
  )

  return (
    <AccountCard>
      {isLoading ? (
        <SkeletonTable columns={3} rows={10} />
      ) : (
        <>
          <p>SkillsReport</p>
          <Pagination
            count={data.total_pages}
            defaultPage={page}
            onChange={(_e, page) => setPage(page)}
          />
        </>
      )}
    </AccountCard>
  )
}

export default SkillsReport
