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
    background-color: #e9eaec;
  }

  .progress-label {
    color: ${(p) => p.theme.colors.greyDark};
  }
`

const LinearProgress: FC<Props> = ({ label, ...props }) => {
  return (
    <Wrapper>
      <Box sx={{ width: '100%', mr: 2 }}>
        <MuiLinearProgress variant="determinate" {...props} />
      </Box>
      {label && (
        <Box>
          <Typography variant="body2" className="progress-label">
            {label}
          </Typography>
        </Box>
      )}
    </Wrapper>
  )
}

export default LinearProgress
