const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const articlesRouter = require('./articles');
const usersRouter = require('./users');

const auth = require('../controllers/auth');
const { handleCreateUser } = require('../controllers/users');

const validationErrorHandler = require('../middleware/error/validation-error-handler');
const centralErrorHandler = require('../middleware/error/central-error-handler');

const validateSignUpRequest = require('../middleware/validation/user');
const validateSignInRequest = require('../middleware/validation/auth');
const { requestLogger, errorLogger } = require('../middleware/loggers');

const router = express.Router();

router.use(requestLogger);
router.use(helmet());
router.use(express.json());
router.use(cors());

router.post('/signin', validateSignInRequest, auth);
router.post('/signup', validateSignUpRequest, handleCreateUser);

router.use('/articles', articlesRouter);
router.use('/users', usersRouter);

router.use(errorLogger);
router.use(validationErrorHandler);
router.use(centralErrorHandler);

module.exports = router;
