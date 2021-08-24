const router = require('express').Router();
const { handleGetCurrentUser } = require('../controllers/users');
const auth = require('../middleware/auth');

router.get('/me', auth, handleGetCurrentUser);

module.exports = router;
