import axios from "axios";
import { store } from "../store/store";
import Cookies from "js-cookie";
import { loginSuccess, logout } from "../features/userInfoSlice";

export const api = axios.create({
    baseURL : 'http://localhost:8081/api',
    withCredentials:true
})

// #1 . Request 인터셉터 설정
//  - 매 요청시마다 Request Hedaer에 access Token 추가하기.
api.interceptors.request.use(
    (config) => {
        const token = store.getState().userInfo.accessToken 
        || Cookies.get('accessToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => Promise.reject(error)
)

// #2. Response 인터셉터 : 401 에러시 처리
//  - 미들웨어에서도 서버컴포넌트 렌더링전 재발급 요청처리를 하고 있지만, 사용자 페이지 전환
//    없이 사이트를 이용하는 경우 accesstoken이 만료처리 된상태에서 axios로 요청이 보내질수
//    도 있다.
//  - 새로고침하거나 페이지 이동시 자동으로 해결되지만, 이를 페이지 전환이나 새로고침없이
//    해결되게 하려면 response내부에서 accesstoken재발급 로직을 짜야 한다.
api.interceptors.response.use(
    res => res, 
    async (err) => {
        const originalRequest = err.config;
        // 에러상태가 401이면서, 재시도한적이 없는 경우
        if(err.response?.status === 401 && !originalRequest._retry){            
            originalRequest._retry = true; // 무한루프 방지 플래그
            try{
                const response = await axios.post(`http://localhost:8081/api/auth/refresh`,{},{
                    withCredentials:true
                });
                const authData = response.data;
                store.dispatch(loginSuccess(authData)); // 리덕스업데이트

                // 기존 헤더 교체 후 실패한 요청 재요청 넣기
                originalRequest.headers.Authorization = `Bearer ${authData.accessToken}`;
                return api(originalRequest);
            }catch(err){
                // 리프레시 토큰도 만료된 경우
                store.dispatch(logout());
                if(typeof window !== 'undefined'){
                    //window.location.href = '\login';
                    alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                }
                return Promise.reject(err);
            }
        }
        return Promise.reject(err);
    }
)
