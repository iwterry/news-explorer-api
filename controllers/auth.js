const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = (req, res, next) => {
  const { body } = req;

  User.findOne({ email: body.email }, { password: true })
    .then((user) => {
      if (user === null) {
        const UNAUTHENTICATED_STATUS_CODE = 401;
        const error = new Error('Incorrect password or email');
        error.httpStatusCode = UNAUTHENTICATED_STATUS_CODE;
        throw error;
      }

      const unhashedPassword = body.password;
      const hashedPassword = user.password;
      return bcrypt.compare(unhashedPassword, hashedPassword);
    })
    .then((isMatchingPasswords) => {
      if (!isMatchingPasswords) {
        const UNAUTHENTICATED_STATUS_CODE = 401;
        const error = new Error('Incorrect password or email');
        error.httpStatusCode = UNAUTHENTICATED_STATUS_CODE;
        throw error;
      }

      // temp solution before adding JSON Web Token
      res.send({ token: 'token' });
    })
    .catch(next);
};
