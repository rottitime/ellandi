import { FC, useState, useEffect } from 'react'
import { Chip as MuiChip, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Props } from './types'

const StyledChip = styled(MuiChip)<Props>`
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

const ToggleChip: FC<Props> = ({
  toggle = true,
  avatarText,
  active = false,
  onToggle,
  ...rest
}) => {
  const [chipActive, setChipActive] = useState(active)

  useEffect(() => {
    setChipActive(active)
  }, [active])

  return (
    <StyledChip
      className={`${toggle ? 'can-toggle' : ''} ${chipActive ? 'active' : ''} `}
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

export default ToggleChip
