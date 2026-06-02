'use client';

import { Layout, Menu, Tooltip } from 'antd';
import { HomeOutlined, PlusOutlined, FileOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined style={{ fontSize: '18px' }} />,
    label: <Link href="/">All Posts</Link>,
  },
  {
    key: '/create',
    icon: <PlusOutlined style={{ fontSize: '18px' }} />,
    label: <Link href="/create">Create Post</Link>,
  },
];

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#ffffff',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '24px',
          fontWeight: '700',
          padding: '0 24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e5e7eb',
          letterSpacing: '-0.5px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#1f2937',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              color: 'white',
            }}
          >
            ✍
          </div>
          <span style={{ color: '#1f2937' }}>BlogHub</span>
        </div>
      </Header>
      <Layout>
        <Sider
          width={260}
          style={{
            background: '#ffffff',
            borderRight: '1px solid #e5e7eb',
          }}
          collapsible
          collapsed={false}
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{
              height: 'calc(100vh - 64px)',
              borderRight: 'none',
              paddingTop: '24px',
              background: 'transparent',
            }}
            theme="light"
            defaultOpenKeys={['/']}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: '32px',
              background: '#ffffff',
              minHeight: 'calc(100vh - 128px)',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                maxWidth: '1400px',
                margin: '0 auto',
              }}
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: '#ffffff',
              borderTop: '1px solid #e5e7eb',
              color: '#6b7280',
              fontWeight: '500',
              letterSpacing: '0.3px',
              padding: '24px 32px',
            }}
          >
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
