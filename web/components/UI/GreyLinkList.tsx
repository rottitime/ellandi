import { LeadParagraph } from 'govuk-react'
import React, { FC } from 'react'
import styled from 'styled-components'
import Link from './Link'

type Props = {
  title?: string
  items: { title: string; url: string }[]
}

const LearningLinks = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  a {
    background-color: ${(p) => p.theme.colors.greyLight};
    display: block;
    margin-bottom: 4px;
    padding: 13px;
  }
`

const GreyLinkList: FC<Props> = ({ title, items }) => (
  <>
    {title && <LeadParagraph>{title}</LeadParagraph>}
    <LearningLinks>
      {items.map((item) => (
        <li key={item.title}>
          <Link href={item.url}>{item.title}</Link>
        </li>
      ))}
    </LearningLinks>
  </>
)

export default GreyLinkList
