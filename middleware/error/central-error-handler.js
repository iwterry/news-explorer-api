// Note that four parameters are required for error handlers in Express
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.httpStatusCode) {
    res.status(err.httpStatusCode).send({ message: err.message });
    return;
  }

  console.log(err);
  res.status(500).send({ message: 'There is a problem on our end. Please try again later.' });
};
