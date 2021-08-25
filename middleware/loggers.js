const winston = require('winston');

/*
  NOTE: I understand that I can use the package 'express-winston'
  (https://www.npmjs.com/package/express-winston) to accomplish the task
  of using logging middleware, but I wanted to see how to
  accomplish much of the same things without it.
*/

const loggerFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

const loggerForRequests = winston.createLogger({
  level: 'info',
  format: loggerFormat,
  transports: new winston.transports.File({ filename: 'logs/request.log' }),
});

const loggerForErrors = winston.createLogger({
  level: 'error',
  format: loggerFormat,
  transports: new winston.transports.File({ filename: 'logs/error.log' }),
});

function getRequestAndResponseInfo(req, res) {
  return {
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    headers: req.headers,
    status: res.statusCode,
  };
}

module.exports.requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on('close', () => {
    const endTime = Date.now();
    loggerForRequests.info({
      ...getRequestAndResponseInfo(req, res),
      responseTime: `${endTime - startTime} ms`,
    });
  });

  next();
};

module.exports.errorLogger = (err, req, res, next) => {
  res.on('close', () => {
    loggerForErrors.error({
      error: err.stack,
      ...getRequestAndResponseInfo(req, res),
    });
  });

  next(err);
};
