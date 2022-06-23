import { FC } from 'react'
import logo from './logo.svg'
import './App.css'

const App: FC<{ test?: any }> = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Alias aut ab similique eos, neque ullam explicabo
        recusandae provident dolorem maxime illo deserunt rerum, laborum aliquid
        perferendis velit, autem accusantium eaque!
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React {process.env.REACT_APP_TEST} {process.env.NODE_ENV}
      </a>
    </header>
  </div>
)

export default App
