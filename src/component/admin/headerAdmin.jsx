import { AlignCenterOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Popover } from "antd"
import DropdownButton from "antd/es/dropdown/dropdown-button"

import { Header } from "antd/es/layout/layout"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../service/api"
import Search from "antd/es/transfer/search"
import SearhAdminPage from "./searchAdminPage"




const HeaderComponentAdmin = () => {
    const isAdmin = useSelector(state => state.loginReducer)
    const logoutApi = async () => {
        await logout()
        window.location.replace('/login')
        localStorage.removeItem('access_token')
    }
    const items = []


    if (isAdmin.user.role === 'ADMIN') {
        items.push(
            {
                item: '1',
                label: (
                    <Link style={{ fontSize: "16px" }} to={'/'}>Trang Chủ</Link>
                )
            })
    }

    if (isAdmin.isAuth) {
        items.push(
            {
                item: '2',
                label: (
                    <Link onClick={logoutApi} style={{ fontSize: "16px" }}>Đăng Xuất</Link>
                )
            })
    }


    return (<> <Header
        style={{

            backgroundColor: "white",
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-between",
            height: "80px"

        }}
    >
        <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px" }} to={'/'}><div>WW BOOK</div></Link>
        <SearhAdminPage></SearhAdminPage>
        {
            isAdmin.isAuth ? (<Dropdown placement="bottom" menu={{ items }}>
                <Avatar size="large" shape="circle" icon={<UserOutlined />}></Avatar>
            </Dropdown>) : <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px" }} to={'/login'}>Đăng Nhập</Link>
        }


    </Header ></>)
}
export default HeaderComponentAdmin