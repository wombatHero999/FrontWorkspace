'use client'

import { api } from "@/app/api/clientAxios";
import { useUserInfoActions } from "@/app/hooks/useUserInfoActions";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function OAuth2Success(){
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLoginSync = useUserInfoActions();

    useEffect(()=> {
        api.get("/auth/me")
            .then((res)=> {
                handleLoginSync(res.data);
            })
            .catch((err)=>{
                console.log("oauth2인증 실패 ");
                router.push('/login');
            })
    },[router, dispatch])
    return (
        <div>로그인 처리중입니다. 잠시만 기다려주세요...</div>
    )
}