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
import AutoSaveEditor from './practice/3. UseEffect'
import OptimizationPractice from './practice/4. OptimizationPractice'
import AxiosGet from './02_react_advanced/04_Axios_GET'
import AxiosPost from './02_react_advanced/04_Axios_POST'
import Header from './02_react_advanced/05_Router'
import { Link, Route, Routes } from 'react-router-dom'
import NestedRoute from './02_react_advanced/06_Nested_Route'
import { UserDetail, UserList, VariableRoute } from './02_react_advanced/07_Variable_Route'
import ContextApi from './03_global_state/1.context/Context'
import Counter from './03_global_state/2. redux/pages/Counter'
import TodoList from './03_global_state/2. redux/pages/TodoList'
import PokemonSearch from './practice/5. PokemonSearch'

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
      <OptimizationHook /> 
      <SingUpForm />
      <AutoSaveEditor/>
      <OptimizationPractice/>
      <AxiosGet/> 
      <AxiosPost/>*/}
      <Header/>

      <Routes>
        <Route path='/' element={<div>메인 페이지</div>} />
        <Route path='/useEffect' element={<UseEffectHook/>}/>
        <Route path="/optimize" element={<OptimizationHook/>}/>
        <Route path="/nested" element={<NestedRoute/>}>
          <Route path="get" element={<AxiosGet/>} />
          <Route path="post" element={<AxiosPost/>}/>
        </Route>
        <Route path="/variable-route" element={<VariableRoute/>}>
          <Route path="user/:id" element={<UserDetail/>} />
          <Route path="" element={<UserList/>} />
        </Route>
        <Route path="/context" element={<ContextApi/>}/>
        <Route path="/counter" element={<Counter/>} />
        <Route path="/redux" element={<TodoList/>} />
        <Route path="/pokemon" element={<PokemonSearch/>}/>
        <Route path="*" element={
          <div>
            <h1>잘못된 페이지입니다.</h1>
            {/* 
              Link
               - html의 a태그와 동일한 기능을 수행하나 페이지 이동시 새로고침 없이
               컴포넌트를 전환한다. 
               - a태그로 인한 페이지 이동은 location을 조작하는 행위로, 리액트에서는
               권장되지 않는 이동방식이다.
            */}
            <Link to={"/"}>메인페이지</Link>
            {/* <a href="/">a태그로 이동하기</a> */}
          </div>
        } />
      </Routes>
      <nav className='nav'>
          <li>
            <Link to="/">메인페이지</Link>
          </li>
          <li>            
            <Link to="/useEffect">useEffect</Link>
          </li>
          <li>            
            <Link to="/optimize">Optimization</Link>
          </li>
          <li>
            <Link to="/nested/get">Axios Get</Link>
          </li>
          <li>
            <Link to="/nested/post">Axios Post</Link>
          </li>
          <li>
            <Link to="/variable-route">Variable Route</Link>
          </li>
          <li>            
            <Link to="/context">Context</Link>
          </li>
          <li>            
            <Link to="/counter">Counter</Link>
          </li>
          <li>            
            <Link to="/redux">Redux</Link>
          </li>
          <li>
            <Link to="/pokemon">포켓몬</Link>
          </li>
        </nav>  

    </>
  )
}

export default App
