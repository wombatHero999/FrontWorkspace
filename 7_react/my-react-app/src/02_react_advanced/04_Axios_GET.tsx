import axios from "axios";
import { useEffect, useState } from "react";

/* 
    Axios
     - 리액트 대표 비동기 통신 라이브러리
     - fetch방식에 비해 문법이 간결하고, 지원하는 기능이 많아 리액트에서 많이 사용된다. 
*/
interface User {
    id:number,
    name:string,
    email:string,
    phone:string
}

export default function AxiosGet(){

    const [users, setUsers] = useState<User[]>([]);

    /*
        axios사용법
        axios.[get/post/put/delete/patch](url, 전송할데이터)        
        .then((result) => 응답성공시 실행할 코드)
        .catch((err) => 실패시 처리할 코드)
    */
    // 비동기통신은 보통 컴포넌트가 마운트 되는 시점에 1회만 실행되도록 useEffect에 작성한다
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users" , {
            params:{}
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    return(
        <div>
            <h2>사용자 목록</h2>
            <ul>
            {
                users.map((user) => (
                    <li key={user.id}>
                        <b>{user.name}</b> - {user.email} / {user.phone}
                    </li>
                ))
            }
            </ul>
        </div>
    )
}






