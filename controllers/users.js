const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleMongoDbDuplicationError } = require('../helpers/helpers');

module.exports.handleGetCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        /* Note: If this occurs, then there is a something that happened on the backend,
        so this would be a server error. */
        throw new Error(`User ${req.user._id} not found in database but is a logged-in user.`);
      }

      res.send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.handleCreateUser = (req, res, next) => {
  const { body } = req;
  const SALT_LENGTH = 10;

  bcrypt.hash(body.password, SALT_LENGTH)
    .then((hashedPassword) => (
      User.create({
        email: body.email,
        name: body.name,
        password: hashedPassword,
      })
    ))
    .then((user) => {
      const RESOURCE_CREATED_STATUS_CODE = 201;
      res.status(RESOURCE_CREATED_STATUS_CODE).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(handleMongoDbDuplicationError({ errMsg: 'Must use a different email to create a new user.' }))
    .catch(next);
};
