import React, { useEffect } from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';
const { TextArea } = Input;


interface TProducts {
    id: string
    name: string
    price: number
    description: string

}

function Add() {
    const nav = useNavigate()
    const onFinish: FormProps<TProducts>['onFinish'] = async (values) => {
        console.log('Success:', values);
        try {
            await axios.post(`http://localhost:3000/products`, values)
            alert('ADD SUCCESS')
            nav('/')
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
            initialValues={{ price: 1 }}
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

export default Add
