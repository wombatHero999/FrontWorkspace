import { useEffect, useState } from "react";

export default function UseEffectHook(){
    /*
        #1. Hook
         - Hook은 함수형 컴포넌트 내부에 React의 기능(state선언 및 관리,
         생명주기 함수)을 연결할 수 있도록 도와주는 함수. 
         - 원래 React에서는 컴포넌트가 복잡한 동작을 수행하려면 클래스컴포
         넌트를 써야했지만, 그럴 경우 코드가 복잡하고 가독성이 떨어졌음. 
         - 이를 해결하기 위해 함수형 컴포넌트만의 간결함을 유지하면서,
         클래스처럼 기능을 확장할 수 있도록 hook함수가 추가되었다. 
    */
    const [count, setCount] = useState(0);
    /*
        #2 useEffect
        - React컴포넌트가 실행되고(mount), 삭제되고(unmount),
        업데이트(update)될때를 감지하여 특정 작업을 수행할 수 있게
        도와주는 hook 함수

        #3_1) 생명주기 함수
         - 컴포넌트는 생성부터 소멸까지 특정 순서에 맞춰서 동작하며, 이
         과정을 생명주기(lifecycle)이라고 부른다. 
         - mount : 컴포넌트 첫 렌더링 시기
         - update : props나 state가 변경되어 컴포넌트가 리 렌더링되는 시기
         - unmount : 컴포넌트가 화면에서 사라지는 시기.

        #3_2) 사용법
        useEffect(()=> {
            //실행할 코드(마운트, 업데이트시 실행)
            // ex) 이벤트 등록, 타이머 설정, api호출 등
            
            return () => {
                // 컴포넌트 언마운트시 실행할 코드
                // cleanup 코드를 작성한다
                // 이벤트 해제, 타이머해제 등
            }
        },[의존성,의존성...]) // 의존성(state)이 변경될때 마다 useEffect실행
    */  

    // api서버와 통신하여 초기 데이터를 load하고자 할때 
    useEffect(()=> {
        console.log("서버와 통신");

        return () => {
            console.log("unmount시 실행")
        }
    },[]); // 의존성배열을 비워두면 최초 마운트시만 코드가 실행된다
    
    // 의존성 배열을 활용한 update
    useEffect(()=> {
        console.log('컴포넌트 mount');

        const timer = setInterval(()=> {
            //console.log("타이머 동작 중...");
            setCount((prev) => prev+1);
        }, 1000);

        return () => {
            // clean-up 작업
            clearInterval(timer);
        }
    },[])

    return (
        <div>
            <h1>UseEffect</h1>
            <h2>count : {count}</h2>
            <button onClick={() => setCount(count+1)} >+</button>
        </div>
    )
}



