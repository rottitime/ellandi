import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/UI/Layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <p>process.env.NEXT_PUBLIC_ANALYTICS_ID: {process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      \ //lop through data
      <li>data.name</li>
    </Layout>
  )
}
