import { Box, styled, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import { Props } from './types'

const StyledPercentageBar = styled(Box)<Props>`
  position: relative;
  .bar {
    border: 2px solid ${(p) => p.theme.colors.black};
    border-radius: 12px;
  }

  .mark-label {
    position: absolute;
  }
`

const PercentageBar: FC<Props> = ({ brandColor, marks, ...props }) => {
  const { colors } = useTheme()

  return (
    <StyledPercentageBar {...props}>
      <Box className="bar"></Box>
      {marks.map(({ label, value }) => (
        <Typography
          key={value}
          sx={{
            left: value === 100 ? 'auto' : `${value}%`,
            right: value === 100 ? 0 : `auto`
          }}
          variant="caption"
          component="span"
          className={`mark-label ${value === 100 ? 'last' : ''}`}
        >
          {label}
        </Typography>
      ))}
    </StyledPercentageBar>
  )
}

export default PercentageBar
