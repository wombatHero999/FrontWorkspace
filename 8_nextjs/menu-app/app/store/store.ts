import { configureStore } from "@reduxjs/toolkit";
import userInfo from '../features/userInfoSlice';

export const store = configureStore({
    reducer : {
        userInfo 
    }
});

export type RootType = ReturnType<typeof store.getState>;
