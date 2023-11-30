import { ConfigureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
export const store = ConfigureStore({
    reducer: {user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})