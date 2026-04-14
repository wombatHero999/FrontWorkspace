import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

export function VariableRoute(){
    return(
        <div>
            <h1>Variable Route</h1>
            <Outlet/>
        </div>
    )
}
// 동적라우팅 컴포넌트
export function UserDetail(){
    // /user/1
    // /user/2

    /* 
        useParams
        - URL파라미터를 추출하는 훅함수
        - /user/1에서 1부분을 추출할 수 있다.
        - /user/:id
    */
    const params = useParams();// {id : 1}
    const id = Number(params.id);

    /* 
        useLocation
         - 현재 url위치정보를 가져오는 훅 함수
         - url의 pathname, search값, hash값등을 가져올 수 있다.
    */
    const location = useLocation();

    /* 
        useNavigate
         - 리액트에서 안전한 페이지 이동을 위해 제공하는 훅 함수.
    */
    const navigate = useNavigate();

    const users = [
        {id : 1, name:'김지원'},
        {id : 2, name :'김태환'},
        {id : 3, name : '박무혁'}
    ]

    return (
        <div>
            <h2>사용자 상세 정보</h2>
            <p>사용자 ID : {id}</p>
            <p>사용자 name : {users.find(user => user.id === id)?.name }</p>
            <p>현재 경로 : {location.pathname} </p>
            <button onClick={()=> navigate('/variable-route')}>
                목록으로 가기
            </button>
        </div>
    )
}

export function UserList(){
    const users = [
        {id : 1, name:'김지원'},
        {id : 2, name :'김태환'},
        {id : 3, name : '박무혁'}
    ];

    const navigate = useNavigate();

    const pageMove = (id:number) => {
        navigate("/variable-route/user/"+id);
    }

    return (
        <div>
            <h2>사용자 목록</h2>       
            <ul>
            {
                users.map( user => {
                    return (
                        <li key={user.id}>
                            <button onClick={() => pageMove(user.id)}>{user.id} - {user.name}</button>
                        </li>
                    )
                })
            }
            </ul>     
        </div>
    )

}







