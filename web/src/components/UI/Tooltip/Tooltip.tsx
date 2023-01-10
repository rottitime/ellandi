import { IconButton, Tooltip as MuiTooltip, styled, useTheme, Zoom } from '@mui/material'
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
  children,
  icon = 'question',
  ...props
}) => {
  const { colors } = useTheme()
  const popperColor = brandColor ? colors[brandColor] : colors.black

  return (
    <StyledTooltip
      arrow={arrow}
      TransitionComponent={Zoom}
      placement={placement}
      PopperProps={{
        sx: {
          '.MuiTooltip-tooltip': {
            backgroundColor: popperColor,
            fontSize: 14,
            lineHeight: '24px'
          },
          '.MuiTooltip-arrow': { color: popperColor }
        }
      }}
      {...props}
    >
      {children || (
        <IconButton>
          <Icon icon={icon} />
        </IconButton>
      )}
    </StyledTooltip>
  )
}

export default Tooltip
