import { styled, useTheme } from '@mui/material'
import React, { FC, useEffect, useRef } from 'react'
import { Props } from './types'

const ChartPlaceholder = styled('div')`
  .c3-tooltip-container,
  text {
    font-size: 16px;
  }
`

const Chart: FC<Props> = ({ data, colors = [], hideLegends, misc = {} }) => {
  const theme = useTheme()
  const divRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const load = async () => {
      const c3 = (await import('c3')).default
      c3.generate({
        legend: {
          show: !hideLegends
        },
        bindto: divRef.current,
        color: { pattern: colors.map((color) => theme.colors[color]) },
        data,
        ...misc
      })
    }

    load()
  }, [colors, data, hideLegends, misc, theme.colors])

  return <ChartPlaceholder ref={divRef} />
}

export default Chart
