import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../features/counterSlice";
import type { RootState } from "../store/store";

export default function Counter(){
    //dispatch
    // - 스토어에 액션객체를 전송하는 함수
    const dispatch = useDispatch();

    // selector
    //  - 스토어의 상태를 반환하는 함수
    const counter = useSelector( (state:RootState) => state.counter);

    return(
        <div>
            <div>
                <button onClick={()=> dispatch(increment())}>increment</button>
                <button onClick={()=> dispatch(decrement())}>decrement</button>
                <button onClick={()=> dispatch(incrementByAmount(5))}>5씩 증가</button>
                <p>{counter.value}</p>
            </div>
        </div>
    )

}