import {
  Card as MuiCard,
  styled,
  CardContent,
  // LinearProgress,
  Typography,
  Box
} from '@mui/material'
import { FC } from 'react'
import { Props } from './types'
import Icon from '@/components/Icons/Icon'
import LinearProgress from '@/components/UI/LinearProgress/LinearProgress'

const Card = styled(MuiCard)`
  position: relative;
  transition: opacity ease-in-out 0.3;
  word-wrap: break-word;
  border-radius: 12px 12px 0 0;

  header {
    margin-bottom: ${(p) => p.theme.spacing(4)};
  }

  .card-logo {
    background: ${(p) => p.theme.colors.black};
    padding: ${({ theme: { spacing } }) => `${spacing(2)} ${spacing(3)} `};
    display: flex;
    svg {
      color: ${(p) => p.theme.colors.white};
      font-size: 33px;
    }
  }

  .MuiCardContent-root {
    padding: ${({ theme: { spacing } }) => `${spacing(3)}`};
  }

  .card-title {
    margin-bottom: ${(p) => p.theme.spacing(3)};
  }

  &.loading-active {
    :after {
      pointer-events: none;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0.3;
      background-color: ${(p) => p.theme.colors.white};
      z-index: 1;
    }
  }

  .loading-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
`

const GovCard: FC<Props> = ({ loading = false, children, progress, title, ...props }) => {
  return (
    <Card className={`${loading ? 'loading-active' : ''}`} {...props}>
      <Box className="card-logo">
        <Icon icon="crown-logo" />
      </Box>

      <CardContent>
        <header>
          <Typography variant="leader" component="h2" className="card-title">
            {title}
          </Typography>

          {!!progress && (
            <LinearProgress
              variant="determinate"
              value={progress}
              label={`${progress}%`}
            />
          )}
        </header>
        {children}
      </CardContent>

      {loading && <LinearProgress className="loading-bar" />}
    </Card>
  )
}

export default GovCard