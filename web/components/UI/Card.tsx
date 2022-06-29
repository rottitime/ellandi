import styled from 'styled-components'

type Props = {
  noMargin?: boolean
}

const Card = styled('div')<Props>`
  border: 1px solid ${(p) => p.theme.colors.greyDark};
  padding: 10px;
  margin: ${(p) => (!!p.noMargin ? '0px' : '25px')};
`

export default Card
