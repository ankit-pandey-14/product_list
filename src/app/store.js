import { combineReducers, configureStore } from '@reduxjs/toolkit';
import middlewares from './middlewares';
import authReducer from '../redux/auth/authSlice';


export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend([...middlewares]),
});