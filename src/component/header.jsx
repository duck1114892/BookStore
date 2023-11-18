import { AlignCenterOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Badge, Button, Dropdown, Popover } from "antd"
import DropdownButton from "antd/es/dropdown/dropdown-button"
import Search from "antd/es/input/Search"
import { Header } from "antd/es/layout/layout"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getBookManeger, logout } from "../service/api"
import '../../public/scss/search.css'
import AvataComponent from "./avataComponent"
const HeaderComponent = () => {
    const [search, setSearch] = useState()
    const [dataSearch, setDataSearch] = useState([])
    const isAdmin = useSelector(state => state.loginReducer)
    const cartData = useSelector(state => state.addCartReducer)
    const useNagi = useNavigate()

    const logoutApi = async () => {
        await logout()
        useNagi('/')
        localStorage.clear()
    }
    const items = []


    if (isAdmin.user.role === 'ADMIN') {
        items.push(
            {
                item: '1',
                label: (
                    <Link style={{ fontSize: "16px" }} to={'/admin/user'}>Trang Admin</Link>
                )
            })
    }

    if (isAdmin.isAuth) {
        items.push(
            {
                item: '2',
                label: (
                    <Link to={'/order'} style={{ fontSize: "16px" }}>Lịch Sử Đặt Hàng</Link>
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

    const content = (
        <div >
            {dataSearch.map((item) => {
                return (
                    <Link className="value" style={{ color: 'black' }} to={`/book-detail/${item._id}`}>
                        <div className="value" style={{ display: 'flex', width: "900px", marginTop: "10px" }}>
                            <img src={`${import.meta.env.VITE_BE_URL}/images/book/${item.thumbnail}`} style={{ width: "40px", height: "40px", marginRight: "3%", }} alt="" />
                            <div>{item.mainText}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );

    const contextCart = (
        <div >
            {cartData.cart.map((item, index) => {
                return (<>
                    <Link className="value" style={{ color: 'black' }} to={``}>
                        <div className="value" style={{ display: 'flex', height: "60px", width: "500px", marginTop: "10px" }}>
                            <img src={`${import.meta.env.VITE_BE_URL}/images/book/${item.detail.img}`} style={{ width: "50px", height: "50px", marginRight: "3%", }} alt="" />
                            <div style={{ fontSize: "15px", overflow: "hidden", textOverflow: "ellipsis", }}>{item.detail.name} <div style={{ fontSize: "10px" }}>Số Lượng: {item.quantity}</div> </div>
                        </div></Link>
                </>

                )
            })}
            {cartData.cart.length === 0 ? <div>Giỏ Hàng Trống</div> : <Link to={'/payment'}><Button style={{ marginTop: "4%", marginLeft: "75%" }} danger>Đến Giỏ Hàng</Button></Link>}
        </div>
    )
    const searchHandler = (e) => {

        setSearch(e.target.value)
    }
    useEffect(() => {
        const getData = async () => {
            const dataApi = await getBookManeger()
            let data = dataApi.data

            const result = data.filter((item) => {
                return item.mainText.includes(search)
            })

            setDataSearch(result)
        }
        getData()

    }, [search])

    return (<> <Header
        style={{
            position: 'fixed',
            backgroundColor: "white",
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-around",
            height: "80px"

        }}
    >
        <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px" }} to={'/'}><div>WW BOOK</div></Link>

        <Popover visible={search ? true : false} content={content} trigger="click"><Search onChange={(e) => searchHandler(e)} placeholder="Bạn Cần Tìm Gì ?" size="" style={{ width: '60%' }}></Search></Popover>
        <Popover placement="bottomRight" content={contextCart}><Badge count={cartData.cart.length}><Button style={{ width: "30px" }} shape="circle"><ShoppingCartOutlined /></Button></Badge> </Popover>
        {
            isAdmin.isAuth ? <AvataComponent></AvataComponent> : <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px" }} to={'/login'}>Đăng Nhập</Link>
        }


    </Header ></>)
}
export default HeaderComponent