const express = require('express');
const articlesRouter = require('./articles');

const router = express.Router();

router.use(express.json());
router.use('/articles', articlesRouter);

module.exports = router;
