import type { Metadata } from 'next';
import BlogList from './components/Blog/BlogList';

export const metadata: Metadata = {
  title: 'All Posts - Blog Management System',
  description: 'View all blog posts',
};

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
        <p className="text-gray-600">Manage all your blog posts in one place</p>
      </div>
      <BlogList />
    </div>
  );
}
