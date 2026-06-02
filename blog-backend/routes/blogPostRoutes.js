const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  exportPostsToCSV,
} = require('../controllers/blogPostController');

// Important: Specific routes must come before :id routes
router.get('/search', searchPosts);
router.get('/export/csv', exportPostsToCSV);

// CRUD routes
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
