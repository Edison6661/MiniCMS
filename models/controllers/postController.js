const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, media } = req.body;
    const userId = req.user.id; // req.user встановлюється через middleware

    const post = await Post.create({ title, content, media, userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення поста', error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання постів' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Пост не знайдено' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання поста' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Пост не знайдено' });

    if (post.userId !== req.user.id)
      return res.status(403).json({ message: 'Заборонено' });

    const { title, content, media } = req.body;
    await post.update({ title, content, media });

    res.json({ message: 'Оновлено', post });
  } catch (err) {
    res.status(500).json({ message: 'Помилка оновлення' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Пост не знайдено' });

    if (post.userId !== req.user.id)
      return res.status(403).json({ message: 'Заборонено' });

    await post.destroy();
    res.json({ message: 'Видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення' });
  }
};