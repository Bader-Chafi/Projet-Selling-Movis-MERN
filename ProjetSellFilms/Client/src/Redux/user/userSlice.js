import { CreateSlice } from '@reduxjs/toolkit' ;

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = CreateSlice({
    name: 'userName',
    initialState,
    reducer: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.action
export default userSlice.reducer;