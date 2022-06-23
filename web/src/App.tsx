import { GlobalStyle } from 'govuk-react'
import { Route, Routes } from 'react-router-dom'
import Home1Page from './pages/home1'
import Page1Page from './pages/page1'
import Page10Page from './pages/page10'
import Page11Page from './pages/page11'
import Page12Page from './pages/page12'
import Page13Page from './pages/page13'
import Page2Page from './pages/page2'
import Page3Page from './pages/page3'
import Page4Page from './pages/page4'
import Page5Page from './pages/page5'
import Page6Page from './pages/page6'
import Page7Page from './pages/page7'
import Page8Page from './pages/page8'
import Page9Page from './pages/page9'
import Skills1Page from './pages/skills1'

const App = () => (
  <>
    <GlobalStyle />
    <Routes>
      <Route path="/home1" element={<Home1Page />} />
      <Route path="/" element={<Page1Page />} />
      <Route path="/page1" element={<Page10Page />} />
      <Route path="/page1" element={<Page11Page />} />
      <Route path="/page1" element={<Page12Page />} />
      <Route path="/page1" element={<Page13Page />} />
      <Route path="/page2" element={<Page2Page />} />
      <Route path="/page3" element={<Page3Page />} />
      <Route path="/page4" element={<Page4Page />} />
      <Route path="/page5" element={<Page5Page />} />
      <Route path="/page6" element={<Page6Page />} />
      <Route path="/page7" element={<Page7Page />} />
      <Route path="/page8" element={<Page8Page />} />
      <Route path="/page9" element={<Page9Page />} />
      <Route path="/skill" element={<Skills1Page />} />
    </Routes>
  </>
)

export default App
