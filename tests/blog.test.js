const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('../src/routes');

const app = express();
app.use(bodyParser.json());
app.use('/api/blogs', blogRoutes);

jest.mock('../src/models/db', () => {
  const SequelizeMock = require('sequelize-mock');
  const DBConnectionMock = new SequelizeMock();
  const Blog = DBConnectionMock.define('Blog', {
    id: 1,
    blog_title: 'Test Blog',
    blog_body: 'Test Body',
    blog_date: '2025-06-01',
    blog_author: 'Test Author',
    blog_category: 'Test Category',
  });
  return { sequelize: DBConnectionMock, Blog };
});

describe('Blog API', () => {
  it('should get all blogs', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new blog', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .send({
        blog_title: 'New Blog',
        blog_body: 'New Body',
        blog_date: '2025-06-11',
        blog_author: 'New Author',
        blog_category: 'New Category',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.blog_title).toBe('New Blog');
  });

  it('should get a blog by ID', async () => {
    const res = await request(app).get('/api/blogs/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(1);
  });

  it('should update a blog', async () => {
    const res = await request(app)
      .put('/api/blogs/1')
      .send({ blog_title: 'Updated Blog' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.blog_title).toBe('Updated Blog');
  });

  it('should search blogs by title', async () => {
    const res = await request(app).get('/api/blogs/search/title?title=Test');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
