const { Blog, sequelize } = require('../models/db');
const { Op } = require('sequelize');

// Create a new blog
exports.createBlog = async (req, res) => {
  const { blog_title, blog_body, blog_date, blog_author, blog_category } = req.body;
  if (!blog_title || !blog_body || !blog_date || !blog_author || !blog_category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const newBlog = await Blog.create({
      blog_title,
      blog_body,
      blog_date,
      blog_author,
      blog_category,
    });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [['id', 'DESC']] });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(parseInt(req.params.id));
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  const { blog_title, blog_body, blog_date, blog_author, blog_category } = req.body;
  try {
    const blog = await Blog.findByPk(parseInt(req.params.id));
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    blog.blog_title = blog_title ?? blog.blog_title;
    blog.blog_body = blog_body ?? blog.blog_body;
    blog.blog_date = blog_date ?? blog.blog_date;
    blog.blog_author = blog_author ?? blog.blog_author;
    blog.blog_category = blog_category ?? blog.blog_category;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search blogs by title
exports.searchBlogByTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'Title query parameter is required.' });
  try {
    const blogs = await Blog.findAll({
      where: {
        blog_title: {
          [Op.iLike]: `%${title}%`
        }
      },
      order: [['id', 'DESC']]
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
