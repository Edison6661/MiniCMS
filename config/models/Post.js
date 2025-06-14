const Post = db.define('Post', {
  title:   { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT('long'), allowNull: false },
  media:   { type: DataTypes.STRING, allowNull: true }
});

Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Post, { foreignKey: 'userId' });