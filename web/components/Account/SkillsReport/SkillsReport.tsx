import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Select from '@/components/UI/Select/Select'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import { fetchReportSkills, MeReportSkills, Query, ReportSkillsData } from '@/service/api'
import { useState } from 'react'
import { useQuery } from 'react-query'

const SkillsReport = () => {
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<MeReportSkills>([Query.ReportSkills], () =>
    authFetch(fetchReportSkills)
  )

  console.log({ data })

  return (
    <AccountCard>
      {isLoading ? (
        <SkeletonTable columns={3} rows={10} />
      ) : (
        <>
          <p>SkillsReport</p>

          <Select
            label="Select skill(s)"
            data={['1dede', '2dede', '3dedede']}
            fullWidth
          />

          <Select
            label="Select skill(s)"
            data={['1dede', '2dede', '3dedede']}
            fullWidth
            checkboxes
          />

          <DataGrid
            pageSize={10}
            columns={columns}
            rows={data.data}
            getRowId={(row) => row.name}
            autoHeight
          />
        </>
      )}
    </AccountCard>
  )
}

export default SkillsReport

const columns: GridColDef<ReportSkillsData>[] = [
  {
    field: 'name',
    headerName: 'Skill',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue,
    flex: 1
  },
  {
    field: 'skill_value_percentage',
    headerName: 'Total with skill (%)',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.skill_label} />,
    flex: 1
  },
  {
    field: 'skills_develop_value_percentage',
    headerName: 'Total with skill they would like to develop (%)',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.skills_develop_label} />,
    flex: 1
  }
]
