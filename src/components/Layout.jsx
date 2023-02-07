import React, { useEffect, useState } from 'react';
import {
    MenuOutlined,
    RotateLeftOutlined,
    FormOutlined,
    TagOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import '../assets/styles/style.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../helpers/routes';

const { Sider } = Layout;

function getItem(label, key, icon, path, children) {
    return {
        key,
        icon,
        children,
        label,
        path,
    }
}

const items = [
    getItem('Asosiy', '1', <PieChartOutlined />, '/'),
    getItem('Mahsulotlar', '2', < UserOutlined />, '/products'),
    getItem('Kategoriya', '3', <MenuOutlined />, '/categories'),
    getItem('Attributes', '4', <FormOutlined />, '/attribute'),
    getItem('Brands', '5', <TagOutlined />, '/brand'),
    getItem('Banner', '6', <RotateLeftOutlined />, '/banner')
];

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenuKey, setActiveMenuKey] = useState('1')
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const menuItemHandler = (e) => {
        const { path, key } = e.item.props
        navigate(path)
        isSelectedMenuItem(path, key)
    }
    function isSelectedMenuItem(path, key) {
        if (path === pathname) {
            setActiveMenuKey(key)
        }
    }
    useEffect(() => {
        items.forEach((item) => {
            isSelectedMenuItem(item.path, item.key)
        })
    }, [pathname])
    return (
        <Layout style={{ minHeight: '100vh', paddingTop: '60px' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" selectedKeys={[activeMenuKey]} mode="inline" items={items} onClick={menuItemHandler} />
            </Sider>
            <Layout className="site-layout">
                <Routes>
                    {routes.map((route) => (
                        <Route path={route.path} key={route.id} element={route.component} menuItemHandler />
                    ))}
                </Routes>
            </Layout>
        </Layout>
    );
};

export default MainLayout;