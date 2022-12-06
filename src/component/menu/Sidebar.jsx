import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom'
import "../css/Sidebar.css"
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<h4 style={{textAlign: "center"}}>Danh mục</h4>),
  getItem('Dashboard', '1', <Link to="/dashboard"><ContainerOutlined /></Link>),
  getItem('Home Page','2',  <Link to="/homepage"><DesktopOutlined /></Link>, ),
  getItem('Category', 'sub1', <MailOutlined />, [
    getItem('Customer', '3',<Link to="/customer"></Link>),
    getItem('Product', '4',<Link to="/product"></Link>),
    getItem('discount product','5', <Link to="/discountProduct"></Link>),
    getItem('discount price','6' ,<Link to="/discountPrice"></Link>),
  ]),
  getItem('Report-Statistic', 'sub2', <AppstoreOutlined />, [
    getItem('Customer', '7',<Link to="/reportCustomer"></Link>),
    getItem('Employee', '8',<Link to="/reportEmployee"></Link>),
    getItem('Market', '9',<Link to="/reportMarket"></Link>),
    getItem('Product', '10',<Link to="/reportProduct"></Link>),
  ]),
  getItem('System', 'sub3', <MailOutlined />, [
    getItem('User', '11',<Link to="/user"></Link>),
    getItem('Notification', '12',<Link to="/notification"></Link>),
  ]),
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    
  };
  return (
    <div
      style={{
        width: 256,
        
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          zIndex: 100,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={collapsed ? [] : items}
      />
    </div>
  );
};
export default Sidebar;