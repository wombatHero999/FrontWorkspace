import { useState } from 'react'
import './App.css'
import { Component } from './01_react_basic/01.Component'
import ParentComponent from './01_react_basic/02.PropsAndState'
import ArrayDataBinding from './01_react_basic/03.ArrayBinding'
import UserInfoContainer from './practice/1. PropsPractice'
import BoardContainer from './practice/2. BoardContainer'
import ObjectDataBinding from './01_react_basic/04.ObjectBinding'
import ModuleCSS from './01_react_basic/05.ModuleCss'
import UseEffectHook from './02_react_advanced/01_UseEffectHook'
import OptimizationHook from './02_react_advanced/02_OptimizationHook'
import SingUpForm from './02_react_advanced/03_CustomHook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Component/>
      <ParentComponent/> 
      <ArrayDataBinding/> 
      <UserInfoContainer /> 
      <ObjectDataBinding /> 
      <ModuleCSS/>
      <BoardContainer /> 
      <UseEffectHook /> 
      <OptimizationHook /> */}
      <SingUpForm />
    </>
  )
}

export default App
