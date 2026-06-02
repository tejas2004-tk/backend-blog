import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import LayoutComponent from './components/Layout/Layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blog Management System',
  description: 'A simple and elegant blog post management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <LayoutComponent>{children}</LayoutComponent>
        </ConfigProvider>
      </body>
    </html>
  );
}
