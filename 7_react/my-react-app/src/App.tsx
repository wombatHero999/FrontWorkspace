import { useState } from 'react'
import './App.css'
import { Component } from './01_react_basic/01.Component'
import ParentComponent from './01_react_basic/02.PropsAndState'
import ArrayDataBinding from './01_react_basic/03.ArrayBinding'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Component/>
      <ParentComponent/> */}
      <ArrayDataBinding/>
    </>
  )
}

export default App
