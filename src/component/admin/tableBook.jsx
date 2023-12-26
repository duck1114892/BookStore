import React, { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { getAllUser, getBookApi, getBookManeger } from '../../service/api';
import UpdateModal from './updateUser.jsx';
import DeleteUser from './deleteUser';
import CreateUser from './createUser';
import UpdateBookModal from './updateBook';
import CreateBook from './creatBook';
import DeleteBook from './deleteBook';
import { render } from 'react-dom';
import BookDetail from './detailBook';
import { useSelector } from 'react-redux';

const TableBook = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [isUpate, setUpdate] = useState(true)
    const isSearch = useSelector(state => state.searchAdminReducer.isSearch)
    const searchValue = useSelector(state => state.searchAdminReducer.data)
    const myFnc = () => {
        setUpdate(!isUpate)
    }
    const columns = [
        {
            title: 'ID',
            render: (record) => {
                return (<BookDetail props={record} myFnc={myFnc}></BookDetail>)
            }
        },
        {
            title: 'Tên',
            dataIndex: 'mainText',

        },
        {
            title: 'Tác Giả',
            dataIndex: 'author',

        },
        {
            title: 'Thể Loại',
            dataIndex: 'category',

        },

        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
        }, {
            title: 'Giá',
            dataIndex: 'price',
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 2,
            },
        },
        {
            title: 'Action',
            render: (record) => {
                return (<><UpdateBookModal props={record} myFnc={myFnc} ></UpdateBookModal>
                    <DeleteBook props={record} myFnc={myFnc} ></DeleteBook></>
                )
            }

        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {

    };
    useEffect(() => {
        const getUserApi = async () => {
            setLoading(true)
            try {
                const res = await getBookManeger()
                const dataApi = await res.data


                if (isSearch) {
                    const container = (element) => {
                        return element.mainText.includes(searchValue)
                    }
                    const result = dataApi.filter(container)
                    setData(result)
                }
                if (isSearch === false) {
                    setData(dataApi)
                    finalData = dataApi
                }

            } catch (error) {

            }
            finally {
                setLoading(false)
            }

        }
        getUserApi()
    }, [isUpate, searchValue, isSearch])
    return (<>
        {loading ? (<Spin>Loading...</Spin>) :
            (<>
                <div><CreateBook myFnc={myFnc} ></CreateBook></div>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </>
            )}
    </>
    )


}

export default TableBook