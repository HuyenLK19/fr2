import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TProducts {
    id: string
    name: string
    price: number
    description: string

}

function List() {
    const nav = useNavigate()
    const [products, setProduct] = useState<TProducts[]>([])
    useEffect(() => {
        (async () => {
            try {
                let { data } = await axios.get(`http://localhost:3000/products`)
                console.log(data)
                setProduct(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const columns: TableProps<TProducts>['columns'] = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => nav(`/product/update/${record.id}`)}>Update</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={async () => {
                            try {
                                await axios.delete(`http://localhost:3000/products/${record.id}`)
                                alert("DELETE SUCCESS")
                                setProduct(products.filter(e => e.id != record.id))
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div>
            <Table rowKey='id' columns={columns} dataSource={products} />;
        </div>
    )
}

export default List
