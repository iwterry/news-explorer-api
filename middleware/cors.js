/*
  NOTE: I understand that I can use the package 'cors'
  (https://www.npmjs.com/package/cors) to accomplish the task
  of using CORS middleware, but I wanted to see how to
  accomplish much of the same things without it.
*/
module.exports = (req, res, next) => {
  const corsHeaderNames = {
    allowOrigin: 'access-control-allow-origin',
    allowMethods: 'access-control-allow-methods',
    allowHeaders: 'access-control-allow-headers',
  };

  const corsHeaderValues = {
    allowedOrigin: '*',
    allowedMethods: 'get, post, delete',
    allowedHeaders: 'authorization, content-type',
  };

  res.header(corsHeaderNames.allowOrigin, corsHeaderValues.allowedOrigin);
  res.header(corsHeaderNames.allowMethods, corsHeaderValues.allowedMethods);
  res.header(corsHeaderNames.allowHeaders, corsHeaderValues.allowedHeaders);

  const OPTIONS_HTTP_METHOD = 'options';
  const isOptionsRequest = req.method.toLowerCase() === OPTIONS_HTTP_METHOD;

  if (isOptionsRequest) res.end();
  else next();
};
