import { IconButton, Tooltip as MuiTooltip, styled, useTheme } from '@mui/material'
import Icon from '@/components/Icon/Icon'
import { FC } from 'react'
import { Props } from './types'

const StyledTooltip = styled(MuiTooltip)<Props>`
  svg {
    color: ${({ theme }) => theme.colors.black};
  }
`

const Tooltip: FC<Props> = ({
  brandColor,
  placement = 'top',
  arrow = true,
  ...props
}) => {
  const { colors } = useTheme()
  const popperColor = brandColor ? colors[brandColor] : colors.black

  return (
    <StyledTooltip
      arrow={arrow}
      open={true}
      placement={placement}
      PopperProps={{
        sx: {
          '.MuiTooltip-tooltip': { backgroundColor: popperColor },
          '.MuiTooltip-arrow': { color: popperColor }
        }
      }}
      {...props}
    >
      <IconButton>
        <Icon icon="question" />
      </IconButton>
    </StyledTooltip>
  )
}

export default Tooltip
