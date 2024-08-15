import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type TUser = {
    email?: string;
    password?: string;
};


function Signup() {
    const nav = useNavigate()
    const onFinish: FormProps<TUser>['onFinish'] = async (values) => {
        console.log('Success:', values);
        try {
            await axios.post(`http://localhost:3000/register`, values)
            alert('SIGNup SUCCESS')
            nav('/signin')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<TUser>
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    {
                        type: 'email',
                        message: ' phai la email'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<TUser>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Signup;