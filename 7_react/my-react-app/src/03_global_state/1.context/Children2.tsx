import { useContext } from "react";
import { myContext } from "./Context";

export default function Children2(){
    /*
        useContext(Context)
         - 구독용 컴포넌트에서 전역 상태값을 사용하기 위해 필요한
         훅함수
         - 여러개의 전역상태들 중 하나를 골라서 매개변수에 전달한다. 
    */
    const {userInfo} = useContext(myContext);

    return(
        <>
            <h1>Child2</h1>
            <h3>{userInfo.name} ::: {userInfo.age}</h3>
        </>
    )
}