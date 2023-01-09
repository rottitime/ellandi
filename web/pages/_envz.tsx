import React from 'react'
import getConfig from 'next/config'

type Props = {
  nodeEnv: string
  sentryServerEnvironment: string
}

const { publicRuntimeConfig } = getConfig()

const Info = ({ nodeEnv, sentryServerEnvironment }: Props) => {
  return (
    <section>
      <h1>Environment variables</h1>
      <h2>publicRuntimeConfig</h2>
      <pre>{JSON.stringify(publicRuntimeConfig, null, 2)}</pre>
      <hr />
      <h2>Server variables</h2>
      <ul>
        <li>
          <code>NEXT_PUBLIC_ENVIRONMENT</code>: {process.env.NEXT_PUBLIC_ENVIRONMENT}
        </li>

        <li>
          <code>SENTRY_ENVIRONMENT: {sentryServerEnvironment}</code>
        </li>

        <li>
          <code>NODE_ENV:</code> {nodeEnv}
        </li>
      </ul>
    </section>
  )
}

export async function getStaticProps() {
  const props: Props = {
    nodeEnv: process.env.NODE_ENV || '',
    sentryServerEnvironment: process.env.SENTRY_ENVIRONMENT || ''
  }

  return { props }
}

export default Info
