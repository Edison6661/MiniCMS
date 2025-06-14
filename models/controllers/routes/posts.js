const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/authMiddleware'); // middleware для перевірки токена

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
const upload = require('../middleware/uploadMiddleware');

// POST з медіа
router.post('/', auth, upload.single('media'), async (req, res, next) => {
  try {
    req.body.media = req.file ? `/uploads/${req.file.filename}` : null;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Помилка завантаження медіа', error: err.message });
  }
}, postController.createPost);
