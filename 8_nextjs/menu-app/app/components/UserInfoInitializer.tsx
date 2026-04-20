'use client'

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { api } from "../api/clientAxios";
import { loginSuccess, logout } from "../features/userInfoSlice";

// 새로고침 & 페이지 이동시 사용자 정보를 가져오기 위한 컴포넌트
// layout에 항상 추가시켜둠으로써 매 렌더링마다 호출되어 , 사용자정보
// 동기화에 사용할 예정
export default function UserInfoInitializer(){
    const dispatch = useDispatch();
    const pathname = usePathname();

    useEffect(()=> {
        if(pathname === '/login' || pathname === '/signup' || pathname === '/oauth2/success') return;        
        api.get("/auth/me")
            .then( res => {
                const userData = res.data;
                dispatch(loginSuccess({user : userData}))
            })
            .catch(() => {
                dispatch(logout());
            })
    },[pathname])

    return null;
}






