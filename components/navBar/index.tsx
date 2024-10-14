'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppstoreOutlined,
  BarChartOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';

import { Layout, Menu, Button, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import type { MenuProps } from 'antd';
import NavBar from './topNavBar';
import { CiCalendar, CiSettings, CiStar } from 'react-icons/ci';
import { PiSuitcaseSimpleThin } from 'react-icons/pi';
import { LuUsers2 } from 'react-icons/lu';
import { removeCookie } from '@/helpers/storageHelper';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import Logo from '../common/logo';

const menuItems: MenuProps['items'] = [
  {
    key: '/Employees',
    icon: <CiStar size={20} />,
    label: 'Users',
    className: 'font-bold',
  },
  {
    key: '/visitor',
    icon: <LuUsers2 />,
    label: 'Visitors',
    className: 'font-bold',
    children: [
      { key: '/visitor/manage-visitor', label: 'Manage-visitor', className: 'font-bold' },
      { key: '/visitor/checkin-checkout', label: 'Checkin-Checkout', className: 'font-bold' },
     ],
  },
  {
    key: '/engineering',
    icon: <PiSuitcaseSimpleThin />,
    className: 'font-bold',
    label: 'Engineering',
  },
  {
    key: '/approval',
    icon: <PiSuitcaseSimpleThin />,
    className: 'font-bold',
    label: 'Approval',
  },
  {
    key: '/setting',
    label: 'Setting',
    icon: <CiSettings />,
    className: 'font-bold',
    children: [
      { key: '/setting/permission', label: 'Permission', className: 'font-bold' },
      { key: '/setting/role', label: 'Role', className: 'font-bold' },
     ],
  },
];


interface MyComponentProps {
  children: ReactNode;
}

const Nav: React.FC<MyComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const router = useRouter();
  const { userData, setLocalId, setTenantId, setToken, setUserId, setError } =
    useAuthenticationStore();
  const userRole = userData?.role?.slug || '';
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileCollapsed = () => {
    setMobileCollapsed(!mobileCollapsed);
  };

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
    if (isMobile) {
      setMobileCollapsed(true);
    }
  };

  const handleLogout = () => {
    setToken('');
    setTenantId('');
    setLocalId('');
    removeCookie('token');
    router.push(`/authentication/login`);
    setUserId('');
    setLocalId('');
    setError('');
    removeCookie('token');
    removeCookie('tenantId');
    window.location.reload();
  };

  return (
    <Layout>
      <Sider
        theme="dark"
        width={280}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transform: isMobile && mobileCollapsed ? 'translateX(-100%)' : 'none',
          transition: 'transform 0.3s ease',
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          if (broken) {
            setMobileCollapsed(true);
          }
        }}
        collapsedWidth={isMobile ? 80 : 80}
      >
        <div className="flex justify-between px-4 my-4">
          <div className=" flex items-center gap-2">
            <Logo type="Visitor" />
          </div>

          <div onClick={toggleCollapsed} className="text-black text-xl">
            {collapsed ? (
              <MdOutlineKeyboardDoubleArrowRight />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft />
            )}
          </div>
        </div>
        {!collapsed && (
          <Button
            href="/dashboard"
            className="mt-12 flex justify-between items-center border-2 border-[#3636F0] px-4 py-5 mx-4 rounded-lg "
          >
            <div className="text-black font-bold font-['Manrope'] leading-normal">
              Dashboard
            </div>
            <AppstoreOutlined size={24} className="text-black" />
          </Button>
        )}

        <Menu
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          items={menuItems}
          inlineCollapsed={collapsed}
          className="my-5"
          theme="dark" 
          onClick={handleMenuClick}
        />
      </Sider>
       <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 10 : 20,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header
          style={{
            padding: 4,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            width: isMobile
              ? '100%'
              : collapsed
                ? 'calc(100% - 80px)'
                : 'calc(100% - 280px)',
            zIndex: 1000,
            top: 0,
            left: isMobile && mobileCollapsed ? 0 : collapsed ? 80 : 280,
            transition: 'left 0.3s ease, width 0.3s ease',
          }}
        >
          {isMobile && (
            <div className="w-full h-full p-[10px] flex justify-center items-center">
              <Button
                className="w-full h-full"
                onClick={toggleMobileCollapsed}
                icon={
                  !mobileCollapsed ? (
                    <IoCloseOutline
                      size={24}
                      className="text-gray-500 border-none"
                    />
                  ) : (
                    <MenuOutlined
                      size={24}
                      className="text-gray-500 border-none"
                    />
                  )
                }
              />
            </div>
          )}

          <NavBar page="Home" handleLogout={handleLogout} />
        </Header>
        <Content
          className="overflow-y-hidden min-h-screen"
          style={{
            paddingTop: isMobile ? 64 : 24,
            paddingLeft: isMobile ? 0 : collapsed ? 80 : 280,
            transition: 'padding-left 0.3s ease',
          }}
        >
          <div
            className="p-2 bg-white overflow-auto"
            style={{
              borderRadius: borderRadiusLG,
              marginTop: '3rem',
              marginRight: '1.3rem',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Nav;
