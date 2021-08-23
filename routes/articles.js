const router = require('express').Router();
const {
  handleCreateArticle,
  handleGetArticles,
  handleDeleteArticle,
} = require('../controllers/articles');

router.post('/', handleCreateArticle);
router.get('/', handleGetArticles);
router.delete('/:id', handleDeleteArticle);

module.exports = router;
