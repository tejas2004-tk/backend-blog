'use client';

import { Form, Button, Input, Select, Space, Row, Col, Spin, Card } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { blogAPI } from '@/lib/api';
import { showError, showSuccess } from '@/lib/notifications';

interface BlogFormData {
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string;
  image?: string;
  status: string;
}

interface BlogFormProps {
  isEdit?: boolean;
}

export default function BlogForm({ isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm<BlogFormData>({
    defaultValues: {
      title: '',
      content: '',
      author: '',
      category: '',
      tags: '',
      image: '',
      status: 'draft',
    },
  });

  useEffect(() => {
    if (isEdit && postId) {
      fetchPost();
    }
  }, [isEdit, postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getPostById(postId);
      const { data } = response.data;
      reset({
        title: data.title,
        content: data.content,
        author: data.author,
        category: data.category,
        tags: data.tags?.join(', ') || '',
        image: data.image || '',
        status: data.status,
      });
    } catch (error: any) {
      showError('Error', error.message || 'Failed to fetch post');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: BlogFormData) => {
    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        tags: formData.tags?.split(',').map((tag) => tag.trim()).filter(Boolean) || [],
      };

      if (isEdit && postId) {
        await blogAPI.updatePost(postId, payload);
        showSuccess('Success', 'Post updated successfully');
      } else {
        await blogAPI.createPost(payload);
        showSuccess('Success', 'Post created successfully');
      }

      router.push('/');
    } catch (error: any) {
      showError('Error', error.message || 'Failed to save post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
      }}
    >
      <Spin spinning={loading}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Title"
                required
                help={errors.title?.message}
                validateStatus={errors.title ? 'error' : ''}
              >
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: 'Title is required',
                    minLength: { value: 3, message: 'Title must be at least 3 characters' },
                    maxLength: { value: 200, message: 'Title cannot exceed 200 characters' },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter post title"
                      maxLength={200}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Author"
                required
                help={errors.author?.message}
                validateStatus={errors.author ? 'error' : ''}
              >
                <Controller
                  name="author"
                  control={control}
                  rules={{
                    required: 'Author is required',
                    minLength: { value: 2, message: 'Author name must be at least 2 characters' },
                  }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter author name" />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Category"
                required
                help={errors.category?.message}
                validateStatus={errors.category ? 'error' : ''}
              >
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select a category"
                      options={[
                        { label: 'Technology', value: 'Technology' },
                        { label: 'Business', value: 'Business' },
                        { label: 'Lifestyle', value: 'Lifestyle' },
                        { label: 'Travel', value: 'Travel' },
                        { label: 'Food', value: 'Food' },
                        { label: 'Other', value: 'Other' },
                      ]}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Status">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: 'Draft', value: 'draft' },
                        { label: 'Published', value: 'published' },
                      ]}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Content"
            required
            help={errors.content?.message}
            validateStatus={errors.content ? 'error' : ''}
          >
            <Controller
              name="content"
              control={control}
              rules={{
                required: 'Content is required',
                minLength: { value: 10, message: 'Content must be at least 10 characters' },
              }}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  placeholder="Enter post content"
                  rows={8}
                />
              )}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Tags (comma separated)">
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="e.g., react, javascript, web"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Image URL">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          {watch('image') && watch('image').trim() !== '' && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Image Preview
              </div>
              <img
                src={watch('image')}
                alt="Preview"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              />
            </div>
          )}

          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              size="large"
            >
              {isEdit ? 'Update Post' : 'Create Post'}
            </Button>
            <Button
              onClick={() => router.push('/')}
              size="large"
            >
              Cancel
            </Button>
          </Space>
        </Form>
      </Spin>
    </Card>
  );
}
