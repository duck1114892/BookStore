import React, { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { getAllUser } from '../../service/api';
import UpdateModal from './updateUser.jsx';
import DeleteUser from './deleteUser';
import CreateUser from './createUser';
import { useDispatch, useSelector } from 'react-redux';


const TableUser = () => {
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
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Phone',
            dataIndex: 'phone',

        },
        {
            title: 'Action',
            render: (record) => {
                return (<><UpdateModal props={record} myFnc={myFnc} ></UpdateModal>
                    <DeleteUser props={record} myFnc={myFnc} ></DeleteUser></>
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
                const res = await getAllUser()
                const dataApi = res.data
                let finalData

                if (isSearch) {
                    const container = (element) => {
                        return element.email.includes(searchValue)
                    }
                    const result = dataApi.filter(container)
                    finalData = result
                }
                else {
                    finalData = dataApi
                }
                setData(finalData)
            } catch (error) {
                console.log(error)
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
                <div><CreateUser myFnc={myFnc} ></CreateUser></div>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </>)}
    </>
    )


}

export default TableUser