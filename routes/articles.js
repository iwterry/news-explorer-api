const router = require('express').Router();

const {
  handleCreateArticle,
  handleGetArticles,
  handleDeleteArticle,
} = require('../controllers/articles');

const auth = require('../middleware/auth');

const {
  validateDeleteArticleRequest,
  validateCreateArticleRequest,
} = require('../middleware/validation/articles');

router.post('/', auth, validateCreateArticleRequest, handleCreateArticle);
router.get('/', auth, handleGetArticles);
router.delete('/:id', auth, validateDeleteArticleRequest, handleDeleteArticle);

module.exports = router;
