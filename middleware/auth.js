const jwt = require('jsonwebtoken');
const { getHttpError, httpStatusCodes } = require('../helpers/http');

module.exports = (req, res, next) => {
  const authorizationHeader = req.header('authorization') || '';

  const TOKEN_AUTH_PREFIX = 'Bearer ';
  const unauthenticatedError = getHttpError(httpStatusCodes.unauthenticated, 'Must sign in.');

  if (!authorizationHeader.startsWith(TOKEN_AUTH_PREFIX)) {
    next(unauthenticatedError);
    return;
  }

  try {
    const token = authorizationHeader.slice(TOKEN_AUTH_PREFIX.length);
    const { _id: userId } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { _id: userId };
    next();
  } catch (err) {
    next(unauthenticatedError);
  }
};
