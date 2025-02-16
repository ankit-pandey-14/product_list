import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getApi, postApi } from "../redux/rest/restSlice";
import { logout } from "../redux/auth/authSlice";

const apiAction = {
    'get': getApi,
    'post': postApi,
};

export const useAxios = () => {
    const dispatch = useDispatch();

    const [apiResult, setApiResult] = useState({
        loading: false,
        response: null,
        error: null,
    });

    const dispatchActions = async (methodType, directAction, endpoint, payload) => {
        setApiResult({
            loading: true,
            response: null,
            error: null,
        });

        const action = directAction || apiAction[methodType];
        let apiPayload = directAction ? { ...payload } : { endpoint };
        
        switch(methodType){
            case 'get':
                break;
            case 'post':
            case 'put':
            case 'patch':
                apiPayload = { ...apiPayload, payload  }
                break;
            default:
                break;
        }

        dispatch(action(apiPayload))
        .then(unwrapResult)
        .then((result) => {
            console.log("result", result)
            setApiResult({
                loading: false,
                response: result,
                error: null,
            });
            return result;
        })
        .catch((err) => {
            if(err?.message === 'Request failed with status code 401') {
                dispatch(logout());
            } else {
                setApiResult({
                    loading: false,
                    response: null,
                    error: err,
                });
            }
            throw err;
        })
    };

    return {
        loading: apiResult?.loading,
        response: apiResult?.response,
        error: apiResult?.error,
        dispatchActions,
    }
};