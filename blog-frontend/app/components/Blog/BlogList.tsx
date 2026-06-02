'use client';

import { Button, Table, Space, Popconfirm, Input, Select, Spin, Empty, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { blogAPI } from '@/lib/api';
import { showError, showSuccess } from '@/lib/notifications';

interface BlogPost {
  _id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  views: number;
  createdAt: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchPosts = async (page: number = 1, query: string = '', category: string = '') => {
    setLoading(true);
    try {
      let response;
      if (query || category) {
        response = await blogAPI.searchPosts(query, category, page);
      } else {
        response = await blogAPI.getPosts(page, pagination.pageSize);
      }

      const { data, pagination: paginationData } = response.data;
      setPosts(data);
      setPagination({
        current: paginationData.page,
        pageSize: paginationData.limit,
        total: paginationData.total,
      });
    } catch (error: any) {
      showError('Error', error.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await blogAPI.deletePost(id);
      showSuccess('Success', 'Post deleted successfully');
      fetchPosts(pagination.current, searchQuery, selectedCategory);
    } catch (error: any) {
      showError('Error', error.message || 'Failed to delete post');
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    fetchPosts(1, value, selectedCategory);
  };

  const handleCategoryFilter = (value: string) => {
    setSelectedCategory(value);
    fetchPosts(1, searchQuery, value);
  };

  const handleExport = async () => {
    try {
      const response = await blogAPI.exportToCSV(searchQuery, selectedCategory);
      
      // response.data is now a string (text/csv)
      const csv = response.data;
      
      if (!csv || csv.length === 0) {
        showError('Export Failed', 'No data to export');
        return;
      }

      // Convert string to Blob
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `blog_posts_${Date.now()}.csv`);
      link.style.visibility = 'hidden';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      showSuccess('Success', 'Posts exported to CSV successfully');
    } catch (error: any) {
      console.error('Export error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to export posts';
      showError('Export Failed', errorMessage);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text: string, record: BlogPost) => (
        <Link href={`/view/${record._id}`} className="hover:underline" style={{ color: '#1f2937', fontWeight: '500' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={status === 'published' ? 'text-green-600' : 'text-orange-600'}>
          {status}
        </span>
      ),
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: BlogPost) => (
        <Space size="small">
          <Link href={`/view/${record._id}`}>
            <Button 
              type="primary" 
              size="small" 
              icon={<EyeOutlined />}
              style={{ 
                background: '#1f2937',
                borderColor: '#1f2937',
              }}
            />
          </Link>
          <Link href={`/edit/${record._id}`}>
            <Button 
              size="small" 
              icon={<EditOutlined />}
              style={{
                borderColor: '#d1d5db',
              }}
            />
          </Link>
          <Popconfirm
            title="Delete Post"
            description="Are you sure you want to delete this post?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search & Filter Section */}
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500', marginBottom: '8px' }}>
              Total Posts
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>
              {pagination.total}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500', marginBottom: '8px' }}>
              Published
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>
              {posts.filter((p) => p.status === 'published').length}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500', marginBottom: '8px' }}>
              Total Views
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#3b82f6' }}>
              {posts.reduce((sum, p) => sum + p.views, 0)}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500', marginBottom: '8px' }}>
              Current Page
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#374151' }}>
              {pagination.current} / {Math.ceil(pagination.total / pagination.pageSize)}
            </div>
          </div>
        </Col>
      </Row>

      {/* Controls Section */}
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #e5e7eb',
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={10}>
            <div style={{ marginBottom: '12px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Search
            </div>
            <Input.Search
              placeholder="Search by title, author..."
              onSearch={handleSearch}
              allowClear
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ marginBottom: '12px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Category
            </div>
            <Select
              placeholder="All Categories"
              allowClear
              style={{ width: '100%', borderRadius: '8px' }}
              onChange={handleCategoryFilter}
              size="large"
              options={[
                { label: 'Technology', value: 'Technology' },
                { label: 'Business', value: 'Business' },
                { label: 'Lifestyle', value: 'Lifestyle' },
                { label: 'Travel', value: 'Travel' },
                { label: 'Food', value: 'Food' },
                { label: 'Other', value: 'Other' },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: '12px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Export
            </div>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExport}
              size="large"
              style={{
                width: '100%',
                background: '#1f2937',
                borderColor: '#1f2937',
                fontWeight: '600',
              }}
            >
              Export CSV
            </Button>
          </Col>
        </Row>
      </div>

      {/* Table Section */}
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}
      >
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={posts.map((post) => ({ ...post, key: post._id }))}
            pagination={{
              current: pagination.current,
              total: pagination.total,
              pageSize: pagination.pageSize,
              onChange: (page) => fetchPosts(page, searchQuery, selectedCategory),
              size: 'default',
              showSizeChanger: false,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} posts`,
            }}
            responsive
            bordered={false}
            style={{ borderRadius: '12px' }}
          />
        </Spin>
      </div>
    </div>
  );
}
