import * as thunkMiddleware from 'redux-thunk';
import { axiosInstance } from '../utilities/configureAxios';

const configureMiddlewares = () => {
    const middlewares = [
        thunkMiddleware.withExtraArgument({
            api: axiosInstance,
        })
    ];

    return middlewares;
};

export default configureMiddlewares();