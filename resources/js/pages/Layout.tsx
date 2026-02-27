import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Layout as AntLayout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [currentSection, setCurrentSection] = useState<string>('users');
  const { url } = usePage();

  useEffect(() => {
    if (url === '/')
      router.visit('/users', { replace: true });
    if (url.startsWith('/offices')) 
      setCurrentSection('offices');
  },[]);

  return (
    <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider width={200} style={{ background: '#001529', color: '#fff' }}>
        <div style={{ height: 64, margin: 16, color: '#fff', fontSize: 20, padding:10 }}>
          My App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentSection]}
          style={{ height: '100%', borderRight: 0 }}
          items={[
            {
              key: 'users',
              label: 'Users',
              onClick: () => {router.get('/users'); setCurrentSection('users')},
            },
            {
              key: 'offices',
              label: 'Offices',
              onClick: () => {router.get('/offices'); setCurrentSection('offices')},
            },
          ]}
        />
      </Sider>

      <AntLayout>
        <Content key={url} style={{ overflowY: 'auto', padding: '20px' }}> 
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;