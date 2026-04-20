import { cookies, headers } from "next/headers";

const BASE_URL = 'http://localhost:8081/api';

export const serverFetch = async(endpoint:string, options:RequestInit={}) => {
    // 서버컴포넌트의 fetch에 accesstoken추가하기
    const cookieStore = await cookies();
    const headerList = await headers();

    // 미들웨어 추가시 미들웨어가 재발급한 토큰이 있는지 확인 필요(나중에 하기)

    // 미들웨어 추가전
    const accessToken = cookieStore.get('accessToken')?.value;

    const response = await fetch(
        `${BASE_URL+endpoint}`, {
            ...options ,
            headers : {
                'Cotent-Type':'application/json',
                'Cookie': cookieStore.toString() ,
                ...(accessToken ? {'Authorization':`Bearer ${accessToken}`} : {} ),
                ...options.headers
            }
        }        
    );

    if(!response.ok){
        throw new Error('API ERROR'+response.status);
    }

    return response.json();
}