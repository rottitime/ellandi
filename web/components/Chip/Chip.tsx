import { FC, useState, useEffect } from 'react'
import { Chip as MuiChip, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Props } from './types'

const StyledChip = styled(MuiChip, {
  shouldForwardProp: (p) => p !== 'brandColor'
})<Props>`
  ${({ theme, brandColor }) =>
    brandColor
      ? `
  background-color:${theme.colors[brandColor]};
  color:${theme.colors.white};
  transition:opacity 0.3s;
  &:hover {
    background-color:${theme.colors[brandColor]};
    color:${theme.colors.white};
    opacity:0.5;
  }
  `
      : ''};

  .MuiChip-avatar {
    background-color: ${(p) => p.theme.colors.grey2};
    color: ${(p) => p.theme.colors.white};
  }

  &.can-toggle {
    background-color: ${(p) => p.theme.colors.grey1};

    color: ${(p) => p.theme.colors.black};
    transition: all 0.5s;
    &.active {
      color: ${(p) => p.theme.colors.white};
      background-color: ${(p) => p.theme.colors.blue1};

      .MuiAvatar-root {
        background-color: ${(p) => p.theme.colors.blue2};
      }
    }
    &:hover {
      color: ${(p) => p.theme.colors.white};
      background-color: ${(p) => p.theme.colors.blue1};
      .MuiChip-deleteIcon {
        fill: #efefef;
      }
    }
  }
`

const Chip: FC<Props> = ({ toggle, avatarText, active = false, onToggle, ...rest }) => {
  const [chipActive, setChipActive] = useState(active)

  useEffect(() => {
    setChipActive(active)
  }, [active])

  return (
    <StyledChip
      className={`${toggle ? 'can-toggle' : ''} ${chipActive ? 'active' : ''} `}
      sx={{}}
      onClick={(e) => {
        const active = !chipActive
        setChipActive(active)
        if (typeof onToggle === 'function') onToggle(e, active)
      }}
      avatar={avatarText && <Avatar>{avatarText}</Avatar>}
      {...rest}
    />
  )
}

export default Chip
