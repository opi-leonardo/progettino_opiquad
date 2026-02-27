// Layout.tsx
import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Layout as AntLayout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [currentSection, setCurrentSection] = useState<string>('user');
  const { url } = usePage();

  useEffect(() => {
    if (url === '/') {
      router.visit('/users', { replace: true });
    }
  }, []); 

  useEffect(() => {
    if (url.startsWith('/users')) {
      setCurrentSection('users');
    } else if (url.startsWith('/offices')) {
      setCurrentSection('offices');
    }
  }, [url]);


  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#001529', color: '#fff' }}>
        <div style={{ height: 64, margin: 16, color: '#fff', fontSize: 20 }}>
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
              onClick: () => router.get('/users'),
            },
            {
              key: 'offices',
              label: 'Offices',
              onClick: () => router.get('/offices'),
            },
          ]}
        />
      </Sider>

      <AntLayout style={{ padding: '24px' }}>
        <Content key={url}> 
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;