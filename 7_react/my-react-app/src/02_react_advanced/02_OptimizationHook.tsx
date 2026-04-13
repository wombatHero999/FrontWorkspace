import React, { useCallback, useMemo, useState } from "react";

export default function OptimizationHook(){
    /*
        #1. useMemo
         - 계산결과를 메모해두는 훅 함수. 
         - 리렌더링시 계산비용이 큰 작업의 결과를 캐싱하여 렌더링을 최적화
         한다. 
         - 계산비용이 큰 작업 => 데이터 정렬, 필터링 등    
    */
    const [numbers, setNumbers] = useState([5,1,9,3]);
    const [text , setText] = useState("");

    const heavyComputation = (list: number[]) => {       
        // 시간 지연을 위한 코드.
        console.log("1. heavyComputation 호출");
        const start = performance.now();
        while (performance.now() - start < 1000) {} // 1초 delay
    
        return [...list].sort((a, b) => a - b);
    };

    // 컴포넌트가 리렌더링 될 때마다 정렬된 배열을 다시 계산한다.
    //const sorted = heavyComputation(numbers);

    // useMemo를 활용한 배열 캐싱
    // 현재 컴포넌트가 렌더링 될때마다 배열을 정렬시키고 있는데,
    // 컴포넌트가 마운트 되는 시점에만 계산을 하도록 최적화.
    const sorted = useMemo( () => heavyComputation(numbers),[numbers])

    /* 
        #2. useCallback
         - 함수를 메모해두는 훅함수
         - 매 렌더링마다 새롭게 만들어지는 함수 생성 비용을 줄여준다. 
         - 함수를 부모컴포넌트에서 생성하여 자식 컴포넌트로 전달하는 경우,
         함수가 새롭게 생성되면서 자식 컴포넌트 또한 리 렌더링 되는데 이를
         방지하기 위해 사용한다. 
         - React.memo와 함께 사용
    */

    // const showSorted = () => {
    //     alert("정렬결과 : " + sorted.join(","));
    // }

    const showSorted = useCallback(() => {
        alert("정렬결과 : " + sorted.join(","));
    },[sorted]);

    return(
       <div>
            <h2>최적화 Hook</h2>
            <input value={text} onChange={(e) => setText(e.target.value)} />

            <p>원본 데이터 : {numbers.join(", ")}</p>
            <p>정렬된 데이터 : {sorted.join(",")}</p>

            <ChildList onClick={showSorted}/>

            <button onClick={() => setNumbers([...numbers, Math.floor(Math.random() * 100)])}>
                숫자 추가
            </button>
        </div>     
    )

}

// React.memo -> props가 바뀌지 않으면 리 렌더링 하지 않는 컴포넌트로
//               만드는 함수
const ChildList = React.memo(({onClick} :{onClick: () => void}) => {
    const childHeavyComputation = () => {       
        // 시간 지연을 위한 코드.
        console.log("2. childHeavyComputation 호출");
        const start = performance.now();
        while (performance.now() - start < 500) {} //
    };  

    childHeavyComputation();
    return <button onClick={onClick}>정렬 결과 보기</button>
})
