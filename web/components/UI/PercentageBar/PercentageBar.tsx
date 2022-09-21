import { Box, styled, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import { Props } from './types'

const StyledPercentageBar = styled(Box)`
  position: relative;
  .bar {
    border: 2px solid ${(p) => p.theme.colors.black};
    border-radius: 12px;
    display: flex;
    > div {
      height: 20px;
    }
  }

  .mark-label {
    position: absolute;
  }
`

const PercentageBar: FC<Props> = ({ brandColor, marks, data, ...props }) => {
  const { colors } = useTheme()

  return (
    <StyledPercentageBar {...props}>
      <Box className="bar">
        {data.map(({ percentage, label }) => (
          <Box key={label} aria-label={label} sx={{ width: `${percentage}%` }} />
        ))}
      </Box>
      {marks &&
        marks.map(({ label, value }) => (
          <Typography
            key={value}
            sx={{
              left: value === 100 ? 'auto' : `${value}%`,
              right: value === 100 ? 0 : `auto`
            }}
            variant="caption"
            component="span"
            aria-label={label}
            className={`mark-label ${value === 100 ? 'last' : ''}`}
          >
            {label}
          </Typography>
        ))}
    </StyledPercentageBar>
  )
}

export default PercentageBar
