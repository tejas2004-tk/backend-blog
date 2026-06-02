import type { Metadata } from 'next';
import BlogForm from '@/app/components/Form/BlogForm';

export const metadata: Metadata = {
  title: 'Create Post - Blog Management System',
  description: 'Create a new blog post',
};

export default function CreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-gray-600">Fill in the form below to create a new blog post</p>
      </div>
      <BlogForm />
    </div>
  );
}
