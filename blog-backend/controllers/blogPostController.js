const BlogPost = require('../models/BlogPost');

// Get all blog posts with pagination
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments();

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message,
    });
  }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message,
    });
  }
};

// Create new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, category, tags, image, status } = req.body;

    // Validation
    if (!title || !content || !author || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const newPost = new BlogPost({
      title,
      content,
      author,
      category,
      tags: tags || [],
      image: image || null,
      status: status || 'draft',
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating post',
      error: error.message,
    });
  }
};

// Update blog post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, author, category, tags, image, status } = req.body;

    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          content,
          author,
          category,
          tags: tags || [],
          image: image || null,
          status,
        },
      },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating post',
      error: error.message,
    });
  }
};

// Delete blog post
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message,
    });
  }
};

// Search posts
exports.searchPosts = async (req, res) => {
  try {
    const { query, category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let searchQuery = {};

    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ];
    }

    if (category) {
      searchQuery.category = category;
    }

    const posts = await BlogPost.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching posts',
      error: error.message,
    });
  }
};

// Export posts to CSV
exports.exportPostsToCSV = async (req, res) => {
  try {
    const { query, category } = req.query;

    let searchQuery = {};

    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ];
    }

    if (category) {
      searchQuery.category = category;
    }

    const posts = await BlogPost.find(searchQuery);

    // Always return CSV format
    const headers = ['Title', 'Author', 'Category', 'Status', 'Views', 'Created Date'];
    
    let csvContent;
    if (posts.length === 0) {
      csvContent = headers.join(',');
    } else {
      csvContent = [
        headers.join(','),
        ...posts.map(post =>
          [
            `"${post.title.replace(/"/g, '""')}"`,
            `"${post.author.replace(/"/g, '""')}"`,
            post.category,
            post.status,
            post.views,
            new Date(post.createdAt).toLocaleDateString(),
          ].join(',')
        ),
      ].join('\n');
    }

    // Set response headers for CSV
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="blog_posts.csv"');
    res.setHeader('Cache-Control', 'no-cache');
    
    res.send(csvContent);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).send(`Error exporting posts: ${error.message}`);
  }
};
