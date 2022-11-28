import { createSlice } from "@reduxjs/toolkit";

const initState = () => {
    if (localStorage.getItem('profile')) {
        return JSON.parse(localStorage.getItem('profile'));
    } else {
        return { user: null, token: null };
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initState(),
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            localStorage.removeItem('profile');
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token