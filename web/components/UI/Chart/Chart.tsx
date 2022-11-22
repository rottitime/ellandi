import { styled, useTheme } from '@mui/material'
import React, { FC, useEffect, useRef } from 'react'
import { Props } from './types'

const ChartPlaceholder = styled('div')`
  .c3-tooltip-container,
  text {
    font-size: 16px;
  }

  /*-- Tooltip --*/
  .c3-tooltip-container {
    z-index: 10;
  }

  .c3-tooltip {
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #fff;
    empty-cells: show;
    box-shadow: 7px 7px 12px -9px #777777;
    opacity: 0.9;
  }

  .c3-tooltip tr {
    border: 1px solid #ccc;
  }

  .c3-tooltip th {
    background-color: #aaa;
    font-size: 14px;
    padding: 2px 5px;
    text-align: left;
    color: #fff;
  }

  .c3-tooltip td {
    font-size: 13px;
    padding: 3px 6px;
    background-color: #fff;
    border-left: 1px dotted #999;
  }

  .c3-tooltip td > span {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 6px;
  }

  .c3-tooltip .value {
    text-align: right;
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
