import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'

const ja = 1
export let APP_VERSION = 'v1.0.0'

export default function FirstPost() {
  return (
    <Layout home>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}
