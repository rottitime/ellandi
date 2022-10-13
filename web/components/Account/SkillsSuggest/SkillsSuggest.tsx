import Chip from '@/components/Chip/Chip'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import useAuth from '@/hooks/useAuth'
import { fetchMeSuggestedSkills, fetchMeSuggestedSkillsByRole } from '@/service/me'
import { MeSuggestedSkillsResponse, Query } from '@/service/types'
import { Box, Collapse, styled, Typography } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Props } from './types'

const Wrapper = styled(Box)`
  border: 1px solid ${(p) => p.theme.colors.grey2};
  padding: ${(p) => p.theme.spacing(3)};
  border-radius: 12px;
  .type {
    display: flex;
    flex-wrap: wrap;
    gap: ${(p) => p.theme.spacing(3)};
  }
`

const typeData = {
  default: {
    fetchFn: fetchMeSuggestedSkills,
    description: 'Skills you might have, based on your profile:'
  },
  'job-role': {
    fetchFn: fetchMeSuggestedSkillsByRole,
    description: null
  }
}

const SkillsSuggest: FC<Props> = ({
  onSelected,
  max = 10,
  hideOptions,
  onFetched,
  type,
  data,
  description,
  loading,
  hidden,
  ...props
}) => {
  const { authFetch } = useAuth()
  const [selected, setSelected] = useState<string[]>([])

  // const { isSuccess, data, isLoading } = useQuery<MeSuggestedSkillsResponse>(
  //   Query.SuggestedSkills,
  //   () => authFetch(typeData[type].fetchFn),
  //   { onSuccess: onFetched }
  // )

  const suggestions: MeSuggestedSkillsResponse = useMemo(
    () =>
      !!data
        ? data
            .filter((name) => !(hideOptions.includes(name) || selected.includes(name)))
            .slice(0, max)
        : [],
    [data, max, hideOptions, selected]
  )

  const isHidden = !hidden && !!suggestions.length

  // const rendertype = () => {
  //   return isLoading
  //     ? [...Array(max).keys()].map((i) => <Skeleton key={i} sx={{ mb: 1, width: 100 }} />)
  //     : suggestions.map((name) => (
  //         <Chip
  //           key={name}
  //           label={name}
  //           brandColor="brandSkills"
  //           onClick={() => {
  //             setSelected((p) => [...p, name])
  //             onSelected(name)
  //           }}
  //         />
  //       ))
  // }

  return (
    <Collapse in={isHidden}>
      <Wrapper {...props} data-testid="suggestion-box" aria-hidden={isHidden}>
        {description && (
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
        )}

        {/* {!!typeData[type]?.description && (
          <Typography variant="body2" gutterBottom>
            {typeData[type].description}
          </Typography>
        )} */}

        <Box className="type">
          {loading
            ? [...Array(max).keys()].map((i) => (
                <Skeleton key={i} sx={{ mb: 1, width: 100 }} />
              ))
            : suggestions.map((name) => (
                <Chip
                  key={name}
                  label={name}
                  brandColor="brandSkills"
                  onClick={() => {
                    setSelected((p) => [...p, name])
                    onSelected(name)
                  }}
                />
              ))}
        </Box>
      </Wrapper>
    </Collapse>
  )
}

export default SkillsSuggest
