import React, { FC, useEffect, useId, useRef } from 'react'
import { Props } from './types'

const Chart: FC<Props> = ({ data }) => {
  const divRef = useRef<HTMLDivElement>()

  useEffect(() => {
    console.log({ window })

    // if (typeof window === 'undefined') return

    // const c3 = load()

    const load = async () => {
      const c3 = (await import('c3')).default
      c3.generate({
        // bindto: `#${id}`,
        bindto: divRef.current,
        data
      })
    }

    load()
  }, [data])

  return <div ref={divRef} />
}

export default Chart
