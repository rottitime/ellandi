import { FC, useState, ComponentProps } from 'react'
import { Chip as MuiChip } from '@mui/material'
import { styled } from '@mui/material/styles'
// import { IcPlus, IcChipCross } from '../icons/generated'

type Props = {
  toggle?: boolean
  active?: boolean
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

const ToggleChip: FC<Props> = ({ toggle = true, active = false, onClick, ...rest }) => {
  const [chipActive, setChipActive] = useState(active)

  return (
    <StyledChip
      className={`${toggle ? 'can-toggle' : ''} ${chipActive ? 'active' : ''} `}
      onClick={(e) => {
        setChipActive((p) => !p)
        if (typeof onClick === 'function') onClick(e)
      }}
      {...rest}
    />
  )
}

export default ToggleChip
