import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Table, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import TableUser from '../../component/admin/tableUser';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../component/header';
import '../../../public/scss/adminMobile.css'
import HeaderComponentAdmin from '../../component/admin/headerAdmin';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Dashboard', '1', <Link to={'dashboard'}><PieChartOutlined /></Link>),
    getItem('Table User', '2', <Link to={'user'}><PieChartOutlined /></Link>),
    getItem('Table Book', '3', <Link to={'book'}><PieChartOutlined /></Link>),
    getItem('Table Order', '4', <Link to={'order'}><PieChartOutlined /></Link>),


];





const AdminPage = () => {
    const isAdmin = useSelector(state => state.loginReducer)
    const nagivate = useNavigate()
    if (isAdmin.user.role !== 'ADMIN') {
        nagivate('/')
    }
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();



    return (
        <>
            <div className='error' style={{ display: 'none' }}>Giao diện chưa hỗ trợ trên mobile</div>
            <Layout
                className='adminPage'
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <HeaderComponentAdmin
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >

                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet></Outlet>
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};
export default AdminPage;