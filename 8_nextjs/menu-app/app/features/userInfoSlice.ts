import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../type/user";
import Cookies from "js-cookie";

const userInfoSlice = createSlice({
    name : 'userInfo',
    initialState : {
        ...initialState,
        // 쿠키에 저장된 accesstoken 저장
        accessToken: Cookies.get("accessToken") || null , 
        isAuthenticated : !!Cookies.get("accessToken")
    },
    reducers : {
        loginSuccess : (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout : (state) => {
            state.accessToken = null;
            state.user= null;
            state.isAuthenticated = false;
        }
    },
})

export const {loginSuccess, logout} = userInfoSlice.actions;
export default userInfoSlice.reducer;