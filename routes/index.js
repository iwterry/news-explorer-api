const express = require('express');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const handleValidationErrors = require('../middleware/error/validation');

const router = express.Router();

router.use(express.json());
router.use('/articles', articlesRouter);
router.use('/users', usersRouter);
router.use(handleValidationErrors);

module.exports = router;
