import {
  Card as MuiCard,
  styled,
  CardContent,
  LinearProgress as MuiLinearProgress,
  Typography,
  Box
} from '@mui/material'
import { FC } from 'react'
import { Props } from './types'
import Icon from '@/components/Icon/Icon'
import LinearProgress from '@/components/UI/LinearProgress/LinearProgress'
import { useUiContext } from '@/context/UiContext'

const Card = styled(MuiCard)`
  position: relative;
  transition: opacity ease-in-out 0.3;
  word-wrap: break-word;
  border-radius: 12px 12px 0 0;

  .card-logo {
    background: ${(p) => p.theme.colors.black};
    padding: ${({ theme: { spacing } }) => `${spacing(2)} ${spacing(3)} `};
    display: flex;
    align-items: center;
    position: relative;
    color: ${(p) => p.theme.colors.white};
    svg {
      font-size: 33px;
      margin-right: ${(p) => p.theme.spacing(2)};
    }
  }

  .MuiCardContent-root {
    padding: ${({ theme: { spacing } }) => `${spacing(3)}`};
    position: relative;
  }

  .card-title {
    margin-bottom: ${(p) => p.theme.spacing(3)};
  }

  &.loading-active {
    .MuiCardContent-root:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0.6;
      background-color: ${(p) => p.theme.colors.white};
      z-index: 1;
    }
  }

  .loading-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
`

const GovCard: FC<Props> = ({
  children,
  loading,
  progress,
  headerTitle,
  title,
  ...props
}) => {
  return (
    <Card className={`${loading ? 'loading-active' : ''}`} {...props}>
      <Box className="card-logo">
        <Icon icon="crown-logo" />
        {headerTitle && <Typography>{headerTitle}</Typography>}
        {loading && <MuiLinearProgress className="loading-bar" />}
      </Box>

      <CardContent>
        <header>
          <Typography variant="h1" className="card-title">
            {title}
          </Typography>

          {!!progress && (
            <LinearProgress
              sx={{ mb: 3 }}
              variant="determinate"
              value={progress}
              label={`${progress}%`}
            />
          )}
        </header>
        {children}
      </CardContent>
    </Card>
  )
}

export default GovCard
