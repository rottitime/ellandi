import getConfig from 'next/config'
import Error from 'next/error'

type Props = {
  enable: boolean
  nodeEnv: string
  serverEnvironment: string
}

const { publicRuntimeConfig } = getConfig()
const whitelistEnv = ['local', 'develop', 'staging', 'sandbox']

const DebugPage = (props: Props) => {
  return props.enable ? (
    <section data-testid="success-page">
      <h1>Environment variables</h1>
      <h2>publicRuntimeConfig</h2>
      <pre>
        <code>{JSON.stringify(publicRuntimeConfig, null, 2)}</code>
      </pre>
      <hr />
      <h2>Server variables</h2>
      <ul>
        <li>
          <code>ENVIRONMENT: {props.serverEnvironment}</code>
        </li>

        <li>
          <code>NODE_ENV:</code> {props.nodeEnv}
        </li>
      </ul>
    </section>
  ) : (
    <div data-testid="error-page">
      <Error statusCode={404} />
    </div>
  )
}

export async function getStaticProps() {
  const serverEnvironment = process.env.ENVIRONMENT || ''
  const nodeEnv = process.env.NODE_ENV || ''

  const props: Props = {
    enable: whitelistEnv.includes(serverEnvironment) || nodeEnv !== 'production',
    nodeEnv,
    serverEnvironment
  }

  return { props }
}

export default DebugPage
