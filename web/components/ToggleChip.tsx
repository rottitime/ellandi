import { FC, useState, ComponentProps, MouseEvent, useEffect } from 'react'
import { Chip as MuiChip } from '@mui/material'
import { styled } from '@mui/material/styles'

type Props = {
  toggle?: boolean
  active?: boolean
  onToggle?: (e: MouseEvent<HTMLDivElement>, active: boolean) => void
} & ComponentProps<typeof MuiChip>

const StyledChip = styled(MuiChip)<Props>`
  &.can-toggle {
    background-color: #efefef;

    color: #1976d2;
    transition: all 0.5s;
    &.active {
      color: #efefef;
      background-color: #1976d2;

      .MuiChip-label {
        color: #efefef;
      }

      .MuiAvatar-root {
        background-color: #004e97;
        color: #fff;
      }
    }
    &:hover {
      color: #efefef;
      background-color: #1976d2;
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
