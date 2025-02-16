import React from "react";
import './login.css';
import { Image, message, Spin } from "antd";
import { login } from "../../redux/auth/authSlice";
import { useAxios } from "../../customHooks/useAxios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginFormButtons, loginFormFields } from "../../constants/login";


const CustomForm = React.lazy(() => import("../../components/customForm"));

const LoginScreen = () => {
    const { dispatchActions, loading } = useAxios();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if(isLoggedIn) {
        return <Navigate to={'products'} replace={true} />
    }

    const onLogin = (values) => {
        dispatchActions(null, login, null, values);
    };


    // password: "Nutritap123"
    // username: "testuser@nutritap.in"

    return (
        <Spin spinning={loading}>
            <section>
                <div className="text-center guest-page-header">
                    <h2>Login to View Product Catalouge</h2>
                </div>

                <div className="container d-grid gap-14 place-items-center login-wrapper">
                    <Image
                        src="https://nutritap.in/wp-content/uploads/2023/03/airport-terminal-scaled-e1680091025235.jpg"
                        alt="Nutritap"
                        preview={false}
                        loading='lazy'
                    />

                    <div className="w-full shadow d-grid align-content-center login-form">
                        <div className="text-center text-semiBlack font-700 ls-1">Login</div>
                        <CustomForm
                            classes='w-full'
                            formFieldsList={loginFormFields()}
                            onSuccess={onLogin}
                            buttonsList={loginFormButtons}
                        />
                    </div>

                </div>
            </section>
            {/* <Form
                name="basic"
                layout="vertical"
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={() => {}}
                autoComplete="off"
            >
                <div>
                    <Form.Item
                        label={'Username'}
                        name={'username'}
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username",
                            }
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label={'Password'}
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password",
                            }
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                </div>

                <div>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                    >
                        Log In
                    </Button>
                </div>
            </Form> */}
        </Spin>
    );
};

export default LoginScreen;