import Chip from '@/components/Chip/Chip'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import { MeSuggestedSkillsResponse } from '@/service/types'
import { Box, Collapse, styled, Typography } from '@mui/material'
import { FC, useMemo, useState } from 'react'
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

const SkillsSuggest: FC<Props> = ({
  onSelected,
  max = 10,
  hideOptions = [],
  data,
  description,
  loading,
  hidden,
  groupId,
  ...props
}) => {
  const [selected, setSelected] = useState<string[]>([])

  const suggestions: MeSuggestedSkillsResponse = useMemo(
    () =>
      !!data
        ? data
            .filter((name) => !(hideOptions.includes(name) || selected.includes(name)))
            .slice(0, max)
        : [],
    [data, max, hideOptions, selected]
  )

  const isHidden = !!hidden || !suggestions.length

  if (!suggestions.length) {
    return null
  }

  return (
    <Collapse in={!isHidden}>
      <Wrapper {...props} data-testid="suggestion-box" aria-hidden={isHidden}>
        {description && (
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
        )}

        <Box className="type">
          {loading
            ? [...Array(max).keys()].map((i) => (
                <Skeleton key={i} sx={{ mb: 1, width: 100 }} />
              ))
            : suggestions.map((name) => {
                return (
                  <Chip
                    key={`${groupId}-${name}`}
                    label={name}
                    brandColor="brandSkills"
                    onClick={() => {
                      setSelected((p) => [...p, name])
                      onSelected(name)
                    }}
                  />
                )
              })}
        </Box>
      </Wrapper>
    </Collapse>
  )
}

export default SkillsSuggest
