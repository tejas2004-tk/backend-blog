'use client';

import { Card, Button, Space, Spin, Empty, Row, Col, Tag, Divider } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { blogAPI } from '@/lib/api';
import { showError, showSuccess } from '@/lib/notifications';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  status: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogView() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getPostById(postId);
      setPost(response.data.data);
    } catch (error: any) {
      showError('Error', error.message || 'Failed to fetch post');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await blogAPI.deletePost(postId);
      showSuccess('Success', 'Post deleted successfully');
      router.push('/');
    } catch (error: any) {
      showError('Error', error.message || 'Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Spin spinning={loading}>
      {post ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <Link href="/">
              <Button 
                icon={<ArrowLeftOutlined />}
                style={{
                  borderColor: '#d1d5db',
                }}
              >
                Back to List
              </Button>
            </Link>
            <Space>
              <Link href={`/edit/${postId}`}>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  style={{
                    background: '#1f2937',
                    borderColor: '#1f2937',
                  }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={deleting}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Space>
          </div>

          <Card
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
            }}
          >
            {post.image && post.image.trim() !== '' && (
              <div className="mb-4" style={{ display: 'block', overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    display: 'block',
                    backgroundColor: '#f0f0f0',
                  }}
                />
              </div>
            )}

            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                marginBottom: '24px',
                padding: '20px',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Author
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {post.author}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Category
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {post.category}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Views
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {post.views}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Created
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Tag color={post.status === 'published' ? 'green' : 'orange'}>
                {post.status.toUpperCase()}
              </Tag>
            </div>

            {post.tags.length > 0 && (
              <div className="mb-4">
                <strong>Tags:</strong>
                <div className="mt-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            )}

            <Divider />

            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-base leading-relaxed">
                {post.content}
              </p>
            </div>

            <Divider />

            <div className="text-sm text-gray-500">
              <p>Last updated: {new Date(post.updatedAt).toLocaleString()}</p>
            </div>
          </Card>
        </div>
      ) : (
        !loading && <Empty description="Post not found" />
      )}
    </Spin>
  );
}
