import { UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown } from "antd"
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { logout } from "../service/api";

const AvataComponent = ({ props }) => {
    const items = []

    const isAdmin = useSelector(state => state.loginReducer)
    const nagivate = useNavigate()
    const logoutApi = async () => {
        await logout()
        localStorage.clear()
        nagivate('/')
        setTimeout(() => {
            window.location.reload()
        }, 100)

    }
    if (isAdmin.user.role === 'ADMIN') {
        items.push(
            {
                item: '1',
                label: (
                    <Link style={{ fontSize: "16px" }} to={'/admin/dashboard'}>Trang Admin</Link>
                )
            })
    }

    if (isAdmin.isAuth) {
        items.push(
            {
                item: '4',
                label: (<>
                    {props ? <Link to='/' style={{ fontSize: "16px" }}>Trang Chủ</Link> : <Link to='/history' style={{ fontSize: "16px" }}>Lịch Sử Đặt Hàng</Link>}
                </>

                )
            },
            {
                item: '2',
                label: (
                    <Link onClick={logoutApi} style={{ fontSize: "16px" }}>Đăng Xuất</Link>
                )
            },

        )
    }


    return (<Dropdown placement="bottom" menu={{ items }}>
        <Avatar className="avatar" size="large" shape="circle" icon={<UserOutlined />}></Avatar>
    </Dropdown>)
}
export default AvataComponent