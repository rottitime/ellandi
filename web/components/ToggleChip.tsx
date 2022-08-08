import { FC, useState, ComponentProps, MouseEvent, useEffect } from 'react'
import { Chip as MuiChip } from '@mui/material'
import { styled } from '@mui/material/styles'

type Props = {
  toggle?: boolean
  active?: boolean
  onToggle?: (e: MouseEvent<HTMLDivElement>, active: boolean) => void
} & ComponentProps<typeof MuiChip>

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

const ToggleChip: FC<Props> = ({ toggle = true, active = false, onToggle, ...rest }) => {
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
      {...rest}
    />
  )
}

export default ToggleChip
