const express = require('express');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const handleValidationErrors = require('../middleware/error/validation');
const auth = require('../controllers/auth');
const { handleCreateUser } = require('../controllers/users');

const router = express.Router();

router.use(express.json());

router.post('/signin', auth);
router.post('/signup', handleCreateUser);

router.use('/articles', articlesRouter);
router.use('/users', usersRouter);

router.use(handleValidationErrors);

module.exports = router;
