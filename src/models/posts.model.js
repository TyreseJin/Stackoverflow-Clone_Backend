const Sequelize = require('sequelize');
const db = require('../../config/db.sequelize');
const { AnswersModelSequelize } = require('./answers.model');
const { CommentsModelSequelize } = require('./comments.model');

// constructor
// eslint-disable-next-line func-names
const Post = function (post) {
  this.title = post.title;
  this.body = post.body;
  this.user_id = post.user_id;
  this.tagname = post.tagname;
};

const PostsModelSequelize = db.define('posts', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(250),
    allowNull: true,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  views: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  db,
  tableName: 'posts',
  underscored: true,
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' },
      ],
    },
    {
      name: 'user_id',
      using: 'BTREE',
      fields: [
        { name: 'user_id' },
      ],
    },
  ],
});

// PostsModelSequelize.hasMany(CommentsModelSequelize, {
//   foreignKey: 'post_id',
// });

// PostsModelSequelize.hasMany(AnswersModelSequelize, {
//   foreignKey: 'post_id',
// });

module.exports = { Post, PostsModelSequelize };
