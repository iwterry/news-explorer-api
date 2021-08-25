/*
  NOTE: I understand that I can use the package 'cors'
  (https://www.npmjs.com/package/cors) to accomplish the task
  of using CORS middleware, but I wanted to see how to
  accomplish much of the same things without it.
*/
module.exports = (req, res, next) => {
  const OPTIONS_HTTP_METHOD = 'options';
  const isOptionsRequest = req.method.toLowerCase() === OPTIONS_HTTP_METHOD;

  const headerNames = {
    origin: 'origin',
    allowOrigin: 'access-control-allow-origin',
    allowMethods: 'access-control-allow-methods',
    allowHeaders: 'access-control-allow-headers',
  };

  const allowedOrigins = [
    'http://127.0.0.1:5500',
  ];

  const originOfRequest = req.header(headerNames.origin);
  const isOriginOfRequestApproved = allowedOrigins.includes(originOfRequest);

  if (isOptionsRequest && !isOriginOfRequestApproved) {
    next();
    return;
  }

  const allowedHttpMethods = 'get, post, delete';
  const allowedHeaders = 'authorization, content-type';

  if (originOfRequest) {
    res.header(headerNames.allowOrigin, originOfRequest);
    res.header(headerNames.allowMethods, allowedHttpMethods);
    res.header(headerNames.allowHeaders, allowedHeaders);
  }

  if (isOptionsRequest) res.end();
  else next();
};
