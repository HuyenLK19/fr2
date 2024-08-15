import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const { TextArea } = Input;


interface TProducts {
    id: string
    name: string
    price: number
    description: string

}

function Update() {
    const {id} = useParams()
    const nav = useNavigate()
    const [product, setProduct] = useState<TProducts>()
    const [form] = Form.useForm()

    useEffect(() => {
        (async() => {
            try {
                let {data} =  await axios.get(`http://localhost:3000/products/${id}`)
                setProduct(data)
                form.resetFields()
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
    const onFinish: FormProps<TProducts>['onFinish'] = async (values) => {
        console.log('Success:', values);
        try {
            await axios.patch(`http://localhost:3000/products/${id}`, values)
            alert('UPDATE SUCCESS')
            nav('/')
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Form
        form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={product}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<TProducts>
                label="name"
                name="name"
                rules={[
                    { required: true, message: 'Please input your name!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<TProducts>
                label="price"
                name="price"
                rules={[{ required: true, message: 'Please input your price!' }]}
            >
                <InputNumber min={1} max={10000} />

            </Form.Item>

            <Form.Item<TProducts>
                label="Decription"
                name="description"
                rules={[{ required: true, message: 'Please input your description!' }]}
            >
                <TextArea rows={4} placeholder="maxLength is 20" maxLength={20} />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

}

export default Update
