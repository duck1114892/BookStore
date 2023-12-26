import { Outlet } from "react-router-dom"
import HeaderComponent from "../component/header"
import FooterComponent from "../component/footer"
import { Button, Drawer, Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import SiderComponent from "../component/sider"
import { useState } from "react"
import { MenuOutlined } from "@ant-design/icons"
import '../../public/scss/homepage.css'
const HomePage = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onCloseDrawer = () => {
        setDrawerVisible(false);
    };
    return (<>   <HeaderComponent></HeaderComponent>
        <Layout   >
            <div className="slider" style={{ height: '100vh' }}><SiderComponent></SiderComponent></div>
            <div className="mobileSlider">
                <Button
                    type="primary"
                    onClick={showDrawer}
                    style={{ position: "fixed", top: "10%", left: 0, zIndex: 1 }}
                >
                    <MenuOutlined />
                </Button>

                {/* The Sider Component (Drawer on mobile) */}
                <Drawer
                    title="Menu"
                    placement="left"
                    onClose={onCloseDrawer}
                    visible={drawerVisible}
                >
                    <SiderComponent />
                </Drawer></div>
            <div style={{ height: '100vh', overflow: "auto", width: "100%" }}><Outlet></Outlet></div>

        </Layout >
    </>
    )
}
export default HomePage