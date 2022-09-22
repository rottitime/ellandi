import React from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Info = () => {
  return <pre>{JSON.stringify(publicRuntimeConfig, null, 2)}</pre>
}

export default Info
