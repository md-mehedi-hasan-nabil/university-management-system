const createError = require('http-errors');

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, '404 not found.'));
}

// default error handler
function errorhandler(err, req, res, next) {
  res.locals.errors =
    process.env.NODE_ENV === 'development' ? err : { message: err.message };
  res.status(err.status || 500);
  res.json(res.locals.errors);
}

module.exports = {
  notFoundHandler,
  errorhandler,
};
