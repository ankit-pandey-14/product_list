import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Spin } from 'antd';
import { BrowserRouter } from 'react-router-dom';

// lazy import
const AppRouter = React.lazy(() => import('./AppRouter'));

const App = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='content'>
                    <Suspense fallback={<Spin spinning={true} />}>
                        <AppRouter />
                    </Suspense>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;