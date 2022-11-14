import css from 'styled-jsx/css'

export const withGovLogoBackground = css.global`
  body {
    min-height: 100vh;
  }

  @media (min-width: 767px) {
    body {
      background-image: url(/images/cabinet_office.svg);
      background-repeat: no-repeat;
      background-size: 975px;
      background-position-y: 80px;
      background-position-x: calc(100% + 30px);
    }
  }
`

export const govBackgroundDark = css.global`
  body {
    background-color: #aeaeae;
  }
`
