const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getHttpError, httpStatusCodes } = require('../helpers/http');

module.exports = (req, res, next) => {
  const { body } = req;
  const unauthenticatedError = getHttpError(httpStatusCodes.unauthenticated, 'Incorrect password or email');

  let userId;

  User.findOne({ email: body.email }, { password: true })
    .then((user) => {
      if (user === null) throw unauthenticatedError;

      userId = user._id;

      const unhashedPassword = body.password;
      const hashedPassword = user.password;
      return bcrypt.compare(unhashedPassword, hashedPassword);
    })
    .then((isMatchingPasswords) => {
      if (!isMatchingPasswords) throw unauthenticatedError;

      const token = jwt.sign(
        { _id: userId },
        process.env.TOKEN_SECRET,
        { expiresIn: '7 days' },
      );

      res.send({ token });
    })
    .catch(next);
};
