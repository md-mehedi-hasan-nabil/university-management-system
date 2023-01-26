const jwt = require('jsonwebtoken');

async function authCheck(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      if (bearerToken) {
        jwt.verify(
          bearerToken,
          process.env.JWT_SECRET,
          function (err, decoded) {
            req.email = decoded.email;
            if (err) {
              res.status(401).json({
                error: {
                  message: err.message,
                },
              });
            } else {
              // check some authentication such as email, admin, student
              next();
            }
          }
        );
      }
    } else {
      res.status(401).json({
        error: {
          message: '401 Unauthorized',
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authCheck };
