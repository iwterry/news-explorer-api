const router = require('express').Router();
const { handleGetCurrentUser } = require('../controllers/users');

router.get('/me', handleGetCurrentUser);

module.exports = router;
