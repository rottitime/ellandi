import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
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

  console.log({ data })

  if (isLoading) return

  return (
    <AccountCard>
      <p>SkillsReport</p>
      <Pagination
        count={data.total_pages}
        defaultPage={page}
        onChange={(_e, page) => setPage(page)}
      />
    </AccountCard>
  )
}

export default SkillsReport
