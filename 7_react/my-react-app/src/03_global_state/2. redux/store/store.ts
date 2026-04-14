/* 
    #1 Redux
     - 리액트를 통한 복잡한 전역상태 관리시 자주 사용되는 라이브러리
     - redux는 "장바구니, 실시간 알림, 인증상태 및 권한"등을 관리하며 컴포넌트단위로
     관리되어야 하는 일반 state는 redux로 관리하지 않는다.

    #2. Redux의 구성요소
    1) store(저장소)
     - Redux에서 관리하는 전역상태를 보관하는 중앙 저장소
     - 애플리케이션에서 유일하도록 설정해야 한다.

    2) State(상태값)
     - Store에 저장된 상태값
     - 이 상태값은 읽기전용이며 직접 변경할 수 없다.
    
    3) Action(명령객체) / Action Creator(액션생성함수)
     - 액션은 store의 상태값을 변경하는 요청내용을 담은 객체
     - {type:string, payload?:any} 
     - 액션객체는 객체로 표현되어야 하며 반드시 type을 가져야 한다.
     - 액션생섬함수를 통해 액션객체가 자동으로 생성된다.
    
    4) Reducer(상태변경함수)
     - Action을 받아서 상태값을 변경하는 함수
     - (oldState, payload) => newState
     - RTK에서는 Reducer와 Action, Action Creater를 하나의 파일에서 정의. 
    
    5) Dispatch(Ation전송 함수) 
     - Action을 Store에 전달하는 함수
     - Dispatch를 통해 Action이 전달되면 Action에서 정의한 type의 reducer가 호출된다
    
    6) Selector(구독)
     - store에 저장된 상태값을 꺼내오는 함수
*/
import { configureStore } from "@reduxjs/toolkit";
import counter from '../features/counterSlice';
import todoList from '../features/todoSlice';

// store생성
export const store = configureStore({
    reducer : {
        counter,
        todoList
    }
})

export type RootState = ReturnType<typeof store.getState>;
