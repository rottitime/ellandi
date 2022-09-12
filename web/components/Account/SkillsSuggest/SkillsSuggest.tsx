import Chip from '@/components/Chip/Chip'
import useAuth from '@/hooks/useAuth'
import { fetchMeSuggestedSkills } from '@/service/me'
import { MeSuggestedSkillsResponse, Query } from '@/service/types'
import { Box, Collapse, styled, Typography } from '@mui/material'
import { FC, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Props } from './types'

const Wrapper = styled(Box)`
  border: 1px solid ${(p) => p.theme.colors.grey2};
  padding: ${(p) => p.theme.spacing(3)};
  border-radius: 12px;
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: ${(p) => p.theme.spacing(3)};
  }
`

const SkillsSuggest: FC<Props> = ({ onSelected, hideOptions, ...props }) => {
  const { authFetch } = useAuth()

  const { isSuccess, data } = useQuery<MeSuggestedSkillsResponse>(
    Query.SuggestedSkills,
    () => authFetch(fetchMeSuggestedSkills)
  )

  const list: MeSuggestedSkillsResponse = useMemo(
    () => (isSuccess ? data.filter((name) => !hideOptions.includes(name)) : []),
    [isSuccess, data, hideOptions]
  )

  return (
    <Collapse in={isSuccess}>
      <Wrapper {...props} data-testid="suggestion-box">
        <Typography gutterBottom>
          Skills you might have, based on your profile:
        </Typography>
        <Box className="list">
          {isSuccess &&
            list.map((name) => (
              <Chip key={name} label={name} onClick={() => onSelected(name)} />
            ))}
        </Box>
      </Wrapper>
    </Collapse>
  )
}

export default SkillsSuggest
