// Layout.tsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Layout as AntLayout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        style={{ background: '#001529', color: '#fff' }}
      >
        <div style={{ height: 64, margin: 16, color: '#fff', fontSize: 20 }}>
          My App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={[
            { key: '1', label: <Link href="/users" style={{ color: '#fff' }}>Users</Link> },
            { key: '2', label: <Link href="/offices" style={{ color: '#fff' }}>Offices</Link> },
          ]}
        />
      </Sider>

      <AntLayout style={{ padding: '24px' }}>
        <Content>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;