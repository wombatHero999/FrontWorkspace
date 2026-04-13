import { useState } from 'react';
import { boardList } from './boardMockup';  
import BoardList from './2. BoardList';
import BoardRegister from './2. BoardInsert';
import BoardSearch from './2. BoardSearch';

function BoardContainer(){
  const [list, setList] = useState(boardList);
 
  return(
    <div>
      <BoardList list={list} setList={setList} />
      <BoardRegister list={list} setList={setList} />
      <BoardSearch list={list} />
    </div>
  )
}


export default BoardContainer;