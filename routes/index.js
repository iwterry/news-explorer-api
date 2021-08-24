const express = require('express');
const articlesRouter = require('./articles');
const usersRouter = require('./users');

const auth = require('../controllers/auth');
const { handleCreateUser } = require('../controllers/users');

const validationErrorHandler = require('../middleware/error/validation-error-handler');
const centralErrorHandler = require('../middleware/error/central-error-handler');

const validateSignUpRequest = require('../middleware/validation/user');
const validateSignInRequest = require('../middleware/validation/auth');

const router = express.Router();

router.use(express.json());

router.post('/signin', validateSignInRequest, auth);
router.post('/signup', validateSignUpRequest, handleCreateUser);

router.use('/articles', articlesRouter);
router.use('/users', usersRouter);

router.use(validationErrorHandler);
router.use(centralErrorHandler);

module.exports = router;
