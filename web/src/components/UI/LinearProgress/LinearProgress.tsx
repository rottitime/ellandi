import {
  Box,
  LinearProgress as MuiLinearProgress,
  styled,
  Typography
} from '@mui/material'
import { FC } from 'react'
import { Props } from './types'

const Wrapper = styled(Box)<Props>`
  display: flex;
  align-items: center;

  .MuiLinearProgress-bar {
    background-color: ${(p) => p.theme.colors.black};
  }

  .MuiLinearProgress-root {
    height: 10px;
    background-color: ${(p) => p.theme.colors.grey1};
  }

  .progress-label {
    color: ${(p) => p.theme.colors.grey3};
  }
`

const LinearProgress: FC<Props> = ({ label, sx, ...props }) => {
  return (
    <Wrapper sx={sx}>
      <Box sx={{ width: '100%', mr: 2 }}>
        <MuiLinearProgress variant="determinate" {...props} />
      </Box>
      {label && (
        <Typography variant="caption" className="progress-label">
          {label}
        </Typography>
      )}
    </Wrapper>
  )
}

export default LinearProgress
