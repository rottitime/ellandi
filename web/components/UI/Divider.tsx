import styled from 'styled-components'

type Props = {
  spacing?: number
  color: 'blue' | 'grey'
}

const Divider = styled('hr')<Props>`
  margin: ${(p) => `${p.spacing}px` || 0} 0;
  border-top: 1px solid
    ${(p) => (p.color === 'blue' ? p.theme.colors.blueLight : p.theme.colors.greyLight)};
`

export default Divider
