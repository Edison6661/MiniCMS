const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Post = db.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  media: {
    type: DataTypes.STRING, // URL до медіафайлу
    allowNull: true,
  },
});

Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Post, { foreignKey: 'userId' });

module.exports = Post;