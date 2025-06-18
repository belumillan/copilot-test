const express = require('express');
const router = express.Router();
const blogController = require('../controllers');

// Create blog
router.post('/', blogController.createBlog);

// Get all blogs
router.get('/', blogController.getBlogs);

// Get blog by ID
router.get('/:id', blogController.getBlogById);

// Update blog by ID
router.put('/:id', blogController.updateBlog);

// Search blogs by title
router.get('/search/title', blogController.searchBlogByTitle);

module.exports = router;
