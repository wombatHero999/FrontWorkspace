import { useRef, useState } from "react";

export default function ObjectDataBinding(){
    const [user , setUser] = useState({name:'',age:0});

    // const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //    setUser({
    //     ...user,
    //     name : e.target.value
    //    });
    // }

    // const handleAgeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     setUser({
    //         ...user , 
    //         age : Number(e.target.value)
    //     })
    // }

    // 두 함수를 하나의 함수로 합치기
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //const nameValue = (document.querySelector("#name") as HTMLInputElement).value;
        const {name, value} =e.target;
        // setUser({
        //     ...user,
        //     [name] : value
        // });
        // 함수형태 변경
        setUser((prev) => {
            return {...prev, [name]:value}
        });
    }    

    // 유효성검사 및 조건부 렌더링
    const isNameValid = user.name.length >= 2;
    const isAgeValid = user.age > 0;

    return (
        <>
            <div style={{color:"white" , background:'black'}}>
                <p>이름 : {user.name}</p>
                <p>나이 : {user.age}</p>
            </div>
            <div className="title">
                <label>이름 : </label>
                <input
                id="name"
                name="name"
                placeholder="이름"
                value={user.name}
                onChange={handleChange}
                />
                <br/>
                {isNameValid ? null : <p>이름은 2글자 이상적어주세요</p>}
                <label>나이 : </label>
                <input 
                id="age"
                type="number"
                name="age"
                placeholder="나이"  
                value={user.age}
                onChange ={handleChange}
                />
                {!isAgeValid && <p>나이는 1보다 크게 작성해주세요.</p>}
            </div>
            <SearchForm/>
        </>
    )
}

function SearchForm(){
    /* 
        useRef
        - useRef는 input의 현재값을 참조할 수 있게 해주는 함수. 
        - 입력값을 실시간으로 반영하지 않고, 특정 시점에만 가져올 수 있기
        때문에 불필요한 렌더링을 방지할 수 있다. 
        - 입력값을 바탕으로 실시간 검사가 필요한 경우 => onchage+state
          방식으로 관리
          입력값을 바탕으로 실시간 검사가 필요없는 경우 => useRef로 관리
    */
    const keywordRef = useRef<HTMLInputElement>(null);
    
    // 검색결과 관리 state
    const [result, setResult] = useState<string|null>(null);

    //검색용 데이터
    const sample = ['apple','banana','grape','orange'];

    const handleSearch = (e:React.SubmitEvent) => {
        e.preventDefault();
        
        // ref를 활용하여 현재 입력한 값 가져오기
        const keyword = keywordRef.current?.value;
        if(!keyword){
            alert("검색어를 입력하세요.");
            return;
        }
        const found = sample.find(item => item.includes(keyword));
        setResult(found ?? null);
    }

    return (
        <form onSubmit={handleSearch}>
            <input 
            ref={keywordRef}
            type="text"
            placeholder="검색어 입력"
            />
            <button>검색</button>
            {result ?? <p>검색결과가 없습니다.</p>}
        </form>
    )
}
