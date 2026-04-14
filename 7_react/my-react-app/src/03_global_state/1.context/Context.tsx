/* 
    #1. 전역상태관리
     - 모든 컴포넌트에서 공용으로 사용하는 정보는 전역상태로 관리해야 한다
       ex) 사용자 정보, 전역 UI , 테마, 장바구니, 실시간 알림 등
     - 만일 이런 데이터를 일반 STATE로 관리한다면, 자식컴포넌트로 props Drilling을 해줘야
     한다. 
    
    #2. Context
     - 리액트에서 전역상태관리를 위해 제공하는 기능
     - 데이터 공급자(Provider)와 데이터를 구독하는 구독자를 정의하여 데이터를 전달
     - 단, Context는 데이터 공유기능만을 제공하며, 복잡한 상태관리 및 추가기능은
     제공하지 않는다. 
*/

import { createContext, useState } from "react";
import Children1 from "./Children1";
import Children3 from "./Children3";

type User = {
    name : string,
    age : number 
}

const initUser:User = {
    name : 'mkm',
    age : 30
}

export const myContext = createContext<{
    userInfo:User , 
    setUserInfo : (value:User) => void
}>({userInfo : initUser,
    setUserInfo : () => {}
});

export default function ContextApi(){
    const [userInfo, setUserInfo] = useState(initUser);
    const contextValue = {userInfo, setUserInfo};

    return (
        <myContext.Provider value={contextValue}>
            <hr/>
            <Children1/>
            <hr/>
            <Children3/>
        </myContext.Provider>
    )
}






