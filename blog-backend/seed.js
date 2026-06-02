require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

const seedData = [
  {
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful React framework for building production-grade applications. Learn how to get started with Next.js and build amazing web applications with modern tools and best practices.',
    author: 'John Doe',
    category: 'Technology',
    tags: ['nextjs', 'react', 'javascript'],
    status: 'published',
    image: 'https://via.placeholder.com/800x400?text=Next.js'
  },
  {
    title: 'Understanding React Hooks',
    content: 'React Hooks have revolutionized how we write functional components. In this article, we explore useState, useEffect, and custom hooks to build more efficient and maintainable React applications.',
    author: 'Jane Smith',
    category: 'Technology',
    tags: ['react', 'hooks', 'javascript'],
    status: 'published',
    image: 'https://via.placeholder.com/800x400?text=React+Hooks'
  },
  {
    title: 'Web Development Best Practices 2024',
    content: 'As the web development landscape continues to evolve, staying updated with best practices is crucial. This guide covers responsive design, accessibility, performance optimization, and security considerations.',
    author: 'Mike Johnson',
    category: 'Technology',
    tags: ['webdev', 'best-practices', 'performance'],
    status: 'published',
    image: 'https://via.placeholder.com/800x400?text=Web+Dev'
  },
  {
    title: 'MongoDB Atlas Guide',
    content: 'MongoDB Atlas is a fully managed cloud database solution. Learn how to set up, configure, and manage your MongoDB databases in the cloud with this comprehensive guide.',
    author: 'Sarah Williams',
    category: 'Technology',
    tags: ['mongodb', 'database', 'cloud'],
    status: 'published',
    image: 'https://via.placeholder.com/800x400?text=MongoDB'
  },
  {
    title: 'Express.js REST API Development',
    content: 'Building RESTful APIs with Express.js is straightforward and efficient. This guide covers routing, middleware, error handling, and best practices for building scalable APIs.',
    author: 'Tom Brown',
    category: 'Technology',
    tags: ['expressjs', 'api', 'backend'],
    status: 'draft',
    image: 'https://via.placeholder.com/800x400?text=Express.js'
  },
  {
    title: 'The Business Case for Digital Transformation',
    content: 'Digital transformation is no longer optional for businesses. Explore the strategic benefits, challenges, and implementation strategies for digital transformation in your organization.',
    author: 'Emily Davis',
    category: 'Business',
    tags: ['digital', 'transformation', 'strategy'],
    status: 'published',
    image: 'https://via.placeholder.com/800x400?text=Business'
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db');
    console.log('Connected to MongoDB');

    // Clear existing data
    await BlogPost.deleteMany({});
    console.log('Cleared existing posts');

    // Insert seed data
    const result = await BlogPost.insertMany(seedData);
    console.log(`Successfully seeded ${result.length} posts`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
