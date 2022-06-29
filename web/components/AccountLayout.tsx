import Layout from '@/components/Layout'
import { FC, ReactNode } from 'react'
import Link from '@/components/UI/Link'
import styled from 'styled-components'

type Props = {
  children: ReactNode
  activeMenu?: number
}

const Nav = styled('nav')`
  border-top: 1px solid ${(p) => p.theme.colors.greyDark};
  border-bottom: 1px solid ${(p) => p.theme.colors.greyDark};
  margin-bottom: 30px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  a,
  span {
    padding: 10px;
    display: block;
  }
`

const menuItems: { title: string; url: string }[] = [
  { title: 'Home', url: '/account/' },
  { title: 'Skills', url: '/account/skills' },
  { title: 'Learning', url: '/account/learning' },
  { title: 'Careers', url: '/account/careers' },
  { title: 'Communities', url: '/account/communities' },
  { title: 'Favourites', url: '/account/favourites' },
  { title: 'Profile', url: '/account/profile' },
  { title: 'Sign out', url: '/' }
]

const AccountLayout: FC<Props> = ({ activeMenu = 0, children }) => (
  <Layout>
    <Nav>
      <ul>
        {menuItems.map((menu, i) => (
          <li key={menu.title}>
            {activeMenu === i ? (
              <span>{menu.title}</span>
            ) : (
              <Link href={menu.url}>{menu.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </Nav>
    {children}
  </Layout>
)

export default AccountLayout
