import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import * as ROUTES from './constants/routes';


// lazy importing components
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const ProductScreen = React.lazy(() => import('./screens/ProductScreen'));
const ProductDetailScreen = React.lazy(() => import('./screens/ProductScreen/productDetails'));

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<LoginScreen />} />
            <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
            <Route path={ROUTES.PRODUCT} element={<ProductScreen />} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailScreen />} />

            <Route path='*' element={<Navigate to={ROUTES.HOME} replace={true} />} />
        </Routes>
    );
};

export default AppRouter;