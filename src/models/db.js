const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE || 'blogdb',
  process.env.PGUSER || 'postgres',
  process.env.PGPASSWORD || 'password',
  {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blog_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blog_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  blog_author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'blogs',
  timestamps: false,
});

module.exports = { sequelize, Blog };
