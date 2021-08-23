const router = require('express').Router();
const {
  handleCreateArticle,
  handleGetArticles,
  handleDeleteArticle,
} = require('../controllers/articles');

const {
  validateDeleteArticleRequest,
  validateCreateArticleRequest,
} = require('../middleware/validation/articles');

router.post('/', validateCreateArticleRequest, handleCreateArticle);
router.get('/', handleGetArticles);
router.delete('/:id', validateDeleteArticleRequest, handleDeleteArticle);

module.exports = router;
