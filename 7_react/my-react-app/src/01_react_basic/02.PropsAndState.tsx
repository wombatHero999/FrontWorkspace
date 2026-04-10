/*
    #1. Props
     - 부모컴포넌트가 자식컴포넌트에게 데이터를 전달하는 방법
     - 자식컴포넌트는 전달받은 props를 "읽기전용"으로 사용해야 한다. 
     - 단방향 데이터 흐름을 통해 컴포넌트의 상태를 예측하기 쉽게 만든다. 
     - 데이터는 부모에서 자식으로만 전달할 수 있다.
*/

import { useState } from "react";

interface ChildProps {
    style : React.CSSProperties;
    message : string;
    setMessage : (message:string) => void;
}

export default function ParentComponent(){
    // 자식에게 전달한 속성과 데이터 준비
    const style:React.CSSProperties = {color:'white',background:'black'};
    //let message = "Hello from Parent";
    /* 
        state선언 방법
        const [상태값, 상태값변경함수] = useState(초기값);
    */
   let [message, setMessage] = useState('Hello From Parent');

    /* 
        #2. State
         - 컴포넌트내부에서 선언하고 관리하는 상태값.
         - State값이 변경되는 컴포넌트는 리렌더링한다. 
         - 좋아요 상태, 팔로우 숫자, 입력하는 값 등 컴포넌트내부에서
         이 상태값을 감지하기 위한 용도로 선언한다.
         - 부모컴포넌트에서 여러 자식컴포넌트에 공유해야할 데이터가 있는
         경우 부모컴포넌에서 state를 선언후 자식에게 props로 전달해야한다.    
    */

    return (
        <div>
            <ChildComponent style={style} message={message}
            setMessage={setMessage}
            />
        </div>
    )    
}

function ChildComponent({style, message, setMessage}:ChildProps){
//    console.log(props);
    //props.message = "마음에 안드네,..";// props 는 읽기전용으로 사용할것

    const messageHandelr = () => {
        message = "자식에서 수정";
        console.log(message)
    }

    return (<div>
        <h1 style={style}>{message}</h1>
        <button onClick={messageHandelr}>messageHandelr</button>
        <button onClick={()=> setMessage("하이")}>setMessage</button>
    </div>)
}
