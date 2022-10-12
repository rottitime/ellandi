import Chip from '@/components/Chip/Chip'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import useAuth from '@/hooks/useAuth'
import { fetchMeSuggestedSkills } from '@/service/me'
import { MeSuggestedSkillsResponse, Query } from '@/service/types'
import { Box, Collapse, styled, Typography } from '@mui/material'
import { FC, useMemo, useState } from 'react'
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

const SkillsSuggest: FC<Props> = ({
  onSelected,
  max = 15,
  hideOptions,
  onFetched,
  ...props
}) => {
  const { authFetch } = useAuth()
  const [selected, setSelected] = useState<string[]>([])

  const { isSuccess, data, isLoading } = useQuery<MeSuggestedSkillsResponse>(
    Query.SuggestedSkills,
    () => authFetch(fetchMeSuggestedSkills),
    { onSuccess: onFetched }
  )

  const list: MeSuggestedSkillsResponse = useMemo(
    () =>
      isSuccess
        ? data.filter((name) => !(hideOptions.includes(name) || selected.includes(name)))
        : [],
    [selected, isSuccess, data, hideOptions]
  )

  const renderList = () => {
    return isLoading
      ? [...Array(max).keys()].map((i) => <Skeleton key={i} sx={{ mb: 1, width: 100 }} />)
      : list.map((name) => (
          <Chip
            key={name}
            label={name}
            onClick={() => {
              setSelected((p) => [...p, name])
              onSelected(name)
            }}
          />
        ))
  }

  return (
    <Collapse in={isSuccess && !!list.length}>
      <Wrapper
        {...props}
        data-testid="suggestion-box"
        aria-hidden={!isSuccess || !list.length}
      >
        <Typography gutterBottom>
          Skills you might have, based on your profile:
        </Typography>
        <Box className="list">{renderList()}</Box>
      </Wrapper>
    </Collapse>
  )
}

export default SkillsSuggest
