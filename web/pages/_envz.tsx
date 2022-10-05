import React from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Info = () => {
  return (
    <section
      style={{
        backgroundColor: '#fff',
        fontSize: '16px',
        lineHeight: '1.4em',
        padding: '20px'
      }}
    >
      <h1>Environment variables</h1>
      <span
        style={{
          fontWeight: 'bold'
        }}
      >
        NEXT_PUBLIC_API_URL
      </span>
      <p>{publicRuntimeConfig.apiUrl}</p>
      <span
        style={{
          fontWeight: 'bold'
        }}
      >
        GIT_SHA
      </span>
      <p>{publicRuntimeConfig.gitSHA}</p>
      <h2>next.js publicRuntimeConfig</h2>
      <pre>{JSON.stringify(publicRuntimeConfig, null, 2)}</pre>
    </section>
  )
}

export default Info
