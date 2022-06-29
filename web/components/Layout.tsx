import Head from 'next/head'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { BackLink, Footer, Page as GovPage, PhaseBanner, TopNav } from 'govuk-react'

export const siteTitle = 'Civil Service Skills & Learning'

type Props = {
  children: ReactNode
  backLink?: boolean
  title?: string
}

const Layout: FC<Props> = ({ children, title, backLink = false }) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <title>{siteTitle}</title>
    </Head>

    <GovPage
      footer={
        <Footer
          copyright={{
            image: {
              height: 102,
              src: '/images/icon_crown.svg',
              width: 125
            },
            link: 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
            text: 'Crown copyright'
          }}
        />
      }
      header={
        <TopNav
          serviceTitle={
            <TopNav.NavLink href="https://example.com" target="new">
              Civil Service Skills &amp; Learning
            </TopNav.NavLink>
          }
        ></TopNav>
      }
      beforeChildren={
        backLink && (
          <>
            <PhaseBanner level="alpha">
              This part of GOV.UK is being rebuilt –{' '}
              <Link href="https://example.com">find out what that means</Link>
            </PhaseBanner>
            <BackLink
              onClick={() => {
                return history.back()
              }}
            >
              Back
            </BackLink>
          </>
        )
      }
    >
      <main>{children}</main>
    </GovPage>
  </>
)

export default Layout
