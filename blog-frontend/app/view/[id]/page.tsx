import type { Metadata } from 'next';
import BlogView from '@/app/components/Blog/BlogView';

export const metadata: Metadata = {
  title: 'View Post - Blog Management System',
  description: 'View blog post details',
};

export default function ViewPage() {
  return <BlogView />;
}
