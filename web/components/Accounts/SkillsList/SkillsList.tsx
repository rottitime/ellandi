import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { FC } from 'react'
import Link from '@/components/UI/Link'

const SkillsList: FC = () => {
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>Skill</TableCell>
          <TableCell>Skill level</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          'Collaboration',
          'Customer service',
          'Health and wellbeing',
          'Independence',
          'Job coaching',
          'Market research',
          'Risk management'
        ].map((skill) => (
          <TableRow key={skill}>
            <TableCell scope="row">{skill}</TableCell>

            <TableCell scope="row" align="right">
              <Link href="#">Remove</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SkillsList
