const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getHttpError, httpStatusCodes } = require('../helpers/http');

module.exports = (req, res, next) => {
  const { body } = req;
  const unauthenticatedError = getHttpError(httpStatusCodes.unauthenticated, 'Incorrect password or email');

  User.findOne({ email: body.email }, { password: true })
    .then((user) => {
      if (user === null) throw unauthenticatedError;

      const unhashedPassword = body.password;
      const hashedPassword = user.password;
      return bcrypt.compare(unhashedPassword, hashedPassword);
    })
    .then((isMatchingPasswords) => {
      if (!isMatchingPasswords) throw unauthenticatedError;

      // temp solution before adding JSON Web Token
      res.send({ token: 'token' });
    })
    .catch(next);
};
