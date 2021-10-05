const { getHttpError, httpStatusCodes } = require('./http');

function handleMongoDbDuplicationError({ errMsg }) {
  return (err) => {
    const MONGO_DUPLICATION_ERROR_NAME = 'MongoError';
    const MONGO_DUPLICATION_ERROR_CODE = 11000;

    if (err.name !== MONGO_DUPLICATION_ERROR_NAME || err.code !== MONGO_DUPLICATION_ERROR_CODE) {
      throw err;
    }

    throw getHttpError(httpStatusCodes.conflict, errMsg);
  };
}

module.exports = {
  handleMongoDbDuplicationError,
};
