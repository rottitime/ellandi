import { Box, styled } from '@mui/material'
import Icon from '@/components/Icon/Icon'
import { FC, useCallback, useEffect, useRef } from 'react'
import { Props } from './types'

const Banner = styled(Box)`
  background-color: ${(p) => p.theme.colors.white};
  border-bottom: 1px solid ${(p) => p.theme.colors.black};
  padding: ${(p) => p.theme.spacing(3)};
  display: flex;
  align-items: center;

  .title {
    font-weight: bold;
    text-transform: uppercase;
    margin-left: ${(p) => p.theme.spacing(3)};
    margin-right: ${(p) => p.theme.spacing(3)};
  }

  &.is-sticky {
    position: fixed;
    width: 100%;
    z-index: 10;
  }
`

const AlphaBanner: FC<Props> = ({ getHeight, sticky, children, ...props }) => {
  const bannerRef = useRef(null)
  const previousHeight = useRef(0)

  const onResize = useCallback(() => {
    const height = bannerRef?.current?.clientHeight
    const previous = previousHeight?.current
    if (height !== previous && typeof getHeight === 'function') {
      previousHeight.current = height
      getHeight(height)
    }
  }, [getHeight])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  return (
    <Banner {...props} className={`${sticky ? 'is-sticky' : ''}`} ref={bannerRef}>
      <Icon icon="circle-info" size={22} /> <span className="title">Alpha</span>
      {children}
    </Banner>
  )
}

export default AlphaBanner
