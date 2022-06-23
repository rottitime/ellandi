import { GlobalStyle } from 'govuk-react'

const App = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
)

export default App
