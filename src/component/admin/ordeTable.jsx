import React, { useEffect, useState } from 'react';
import { Pagination, Spin, Table } from 'antd';
import { callOrderLsit, getAllUser } from '../../service/api';
import UpdateModal from './updateUser.jsx';
import DeleteUser from './deleteUser';
import CreateUser from './createUser';
import { useDispatch, useSelector } from 'react-redux';


const TableOrder = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const handlePage = (e) => {
        setPage(e)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',

        },
        {
            title: 'Type',
            dataIndex: 'type',

        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Detail',
            dataIndex: "detail",
            render: (detail) => (
                <>
                    {detail.map((item) => (
                        <div className="listItem" key={item._id}>
                            {item.bookName} x {item.quantity}
                        </div>
                    ))}
                </>
            ),

        },
        {
            title: 'Total',
            dataIndex: `totalPrice`,
            render: (e) => {

                return <span> {e.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</span>
            }
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {

    };
    useEffect(() => {
        const getUserApi = async () => {
            setLoading(true)
            try {
                const res = await callOrderLsit(page, pageSize)
                setData(res.data.result)
                setTotal(res.data.meta.total)


            } catch (error) {

            }
            finally {
                setLoading(false)

            }
        }

        getUserApi()
    }, [page])


    return (<>

        {loading ? (<Spin>Loading...</Spin>) :
            (<>

                <Table columns={columns} pagination={false} dataSource={data} onChange={onChange} />
                <Pagination defaultCurrent={page} pageSize={10} total={total} onChange={(e) => {
                    handlePage(e)
                }} />
            </>)}
    </>
    )


}

export default TableOrder