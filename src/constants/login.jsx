import { Input } from "antd";

export const loginFormFields = () => [
    {
        key: 'username',
        label: 'Username',
        name: 'username',
        rules: [
            {
                required: true,
                message: "Please enter your username",
            }
        ],
        renderItem: <Input placeholder="Username" />
    },
    {
        key: 'password',
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                message: "Please enter your password",
            }
        ],
        renderItem: <Input.Password placeholder="Password" />
    },
];

export const loginFormButtons = [
    {
        key: 'B1',
        type: 'primary',
        block: true,
        htmlType: 'submit',
        title: 'Log In',
    }
];