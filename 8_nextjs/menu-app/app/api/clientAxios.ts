import axios from "axios";
import { store } from "../store/store";
import Cookies from "js-cookie";

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
