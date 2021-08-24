module.exports.httpStatusCodes = {
  resourceCreated: 201,
  noContentSent: 204,
  badRequest: 400,
  unauthenticated: 401,
  unauthorized: 403,
  noResourceFound: 404,
  conflict: 409,
};

module.exports.getHttpError = (statusCode, message) => {
  const error = new Error(message);
  error.httpStatusCode = statusCode;
  return error;
};
