import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = null
        },
        setUsername: (state, action) => {
            state.user = {...state.user, username: action.payload}
        }
    }
})

export const { login, logout, setUsername } = userSlice.actions

export const selectUser = state => state.user.user
export const selectUsername = state => state.user.user.username

export default userSlice.reducer