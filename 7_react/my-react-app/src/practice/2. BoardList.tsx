import React from 'react';
import { boardList } from './boardMockup';  

function BoardList({list, setList}: {list: typeof boardList, setList: React.Dispatch<React.SetStateAction<typeof boardList>>}) {
  // #3. 정렬 함수 구현
  // - 작성일 기준 오름차순/내림차순 해주는 함수를 구현하세요.
  const sortByDateAsc = () => {
    list.sort( (a , b) => new Date(a.boardDate).getTime() - new Date(b.boardDate).getTime())
    setList([...list]);
  };
  const sortByDateDesc = () => {
    list.sort( (a , b) => new Date(b.boardDate).getTime() - new Date(a.boardDate).getTime())
    setList([...list]);
  };

  // #2. 삭제함수 구현
  //  - 게시글 번호를 인자로 받아 게시글을 삭제하는 함수를 구현하세요.
  const boardDelete = (boardNo:number) => {
    const filtered = list.filter( board => board.boardNo != boardNo);
    setList(filtered);
  };

  return (
    <div>
      <h2>실습문제 2 : 게시판 목록</h2>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={sortByDateAsc}>작성일 오름차순 정렬</button>
            <button onClick={sortByDateDesc}>작성일 내림차순 정렬</button>
          </div>
        </div>
        <table className='list-table'>
          <thead>
            <tr >
              <th style={{ width : "10%" }}>번호</th>
              <th style={{ width : "40%" }}>제목</th>
              <th style={{ width : "20%" }}>작성자</th>
              <th style={{ width : "20%" }}>작성일</th>
              <th style={{ width : "10%" }}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {  
                list.map( board => (<tr key={board.boardNo}>
                    <td>{board.boardNo}</td>
                    <td>{board.boardTitle}</td>
                    <td>{board.boardWriter}</td>
                    <td>{board.boardDate}</td>
                    <td><button onClick={() => boardDelete(board.boardNo)} >삭제</button></td>
                </tr>))
            }
          </tbody>
        </table>
    </div>
  );
}

export default BoardList;