import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN_ENDPOINT } from "../../constants/endpoints";

const initialState = {
    token: localStorage.getItem('token') || null,
    isLoggedIn: localStorage.getItem('token') ? true : false,
};

// eslint-disable-next-line no-unused-vars
export const login = createAsyncThunk('auth', async (credentials, {dispatch, getState, extra}) => {
    const { api } = extra;

    return api
            .post(LOGIN_ENDPOINT, credentials)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
});

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                // storing token in localstorage
                localStorage.setItem("token", action.payload?.token);

                state.isLoggedIn = action.payload?.success;
                state.token = action.payload?.token;
            })
    }
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;