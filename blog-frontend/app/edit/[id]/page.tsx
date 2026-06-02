import type { Metadata } from 'next';
import BlogForm from '@/app/components/Form/BlogForm';

export const metadata: Metadata = {
  title: 'Edit Post - Blog Management System',
  description: 'Edit blog post',
};

export default function EditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
        <p className="text-gray-600">Update your blog post details</p>
      </div>
      <BlogForm isEdit={true} />
    </div>
  );
}
