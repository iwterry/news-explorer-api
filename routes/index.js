const express = require('express');
const articlesRouter = require('./articles');
const handleValidationErrors = require('../middleware/error/validation');

const router = express.Router();

router.use(express.json());
router.use('/articles', articlesRouter);
router.use(handleValidationErrors);

module.exports = router;
