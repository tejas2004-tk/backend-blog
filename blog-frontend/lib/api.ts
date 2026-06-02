import axios, { AxiosInstance } from 'axios';

const normalizeApiUrl = (url?: string) => {
  const fallback = 'http://localhost:5000/api';
  if (!url || url.trim() === '') return fallback;

  const trimmed = url.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const API_URL = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Blog Post API
export const blogAPI = {
  // Get all posts
  getPosts: (page: number = 1, limit: number = 10) =>
    api.get('/posts', { params: { page, limit } }),

  // Get single post
  getPostById: (id: string) =>
    api.get(`/posts/${id}`),

  // Create post
  createPost: (data: any) =>
    api.post('/posts', data),

  // Update post
  updatePost: (id: string, data: any) =>
    api.put(`/posts/${id}`, data),

  // Delete post
  deletePost: (id: string) =>
    api.delete(`/posts/${id}`),

  // Search posts
  searchPosts: (query: string, category: string = '', page: number = 1) =>
    api.get('/posts/search', { params: { query, category, page } }),

  // Export to CSV - returns text
  exportToCSV: (query: string = '', category: string = '') =>
    api.get('/posts/export/csv', { 
      params: { query, category },
      responseType: 'text' 
    }),
};

export default api;
