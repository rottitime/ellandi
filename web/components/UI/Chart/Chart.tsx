import { useTheme } from '@mui/material'
import React, { FC, useEffect, useRef } from 'react'
import { Props } from './types'

const Chart: FC<Props> = ({ data, colors = [], hideLegends }) => {
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
        data
      })
    }

    load()
  }, [colors, data, hideLegends, theme.colors])

  return <div ref={divRef} />
}

export default Chart
