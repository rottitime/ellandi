import { BackLink, Footer, Link, Page as GovPage, PhaseBanner, TopNav } from 'govuk-react'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  backLink?: boolean
}

const Layout: FC<Props> = ({ children, backLink = false }) => {
  return (
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
        >
          <TopNav.NavLink href="/home">Home</TopNav.NavLink>
          <TopNav.NavLink href="/">Register</TopNav.NavLink>
          <TopNav.NavLink href="/skills">Skills</TopNav.NavLink>
        </TopNav>
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
      {children}
    </GovPage>
  )
}

export default Layout
