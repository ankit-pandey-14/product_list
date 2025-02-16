/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getApi = createAsyncThunk('allGetApi', async(action, {dispatch, getState, extra}) => {
    const { api } = extra;;
    const { endpoint } = action;

    return api
            .get(endpoint);
});


export const postApi = createAsyncThunk('allPostApi', async(action, {dispatch, getState, extra}) => {
    const { api } = extra;;
    const { endpoint, payload } = action;

    return api
            .post(endpoint, payload);
});