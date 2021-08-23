const User = require('../models/user');

module.exports.handleGetCurrentUser = (req, res, next) => {
  // temp solution before adding authentication
  req.user = {
    _id: '6120bf8b108e9c1798bdefbb',
  };

  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        /* Note: If this occurs, then there is a something that happened on the backend,
        so this would be a server error. */
        throw new Error(`User ${req.user._id} not found in database but is a logged-in user.`);
      }

      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};
