import css from 'styled-jsx/css'

export const withGovLogoBackground = css.global`
  body {
    min-height: 100vh;
  }

  @media (min-width: 767px) {
    body {
      background-image: url(/images/bg_crown.svg);
      background-repeat: no-repeat;
      background-size: 975px;
      background-position: top right;
    }
  }
`

export const govBackgroundDark = css.global`
  body {
    background-color: #aeaeae;
  }
`
