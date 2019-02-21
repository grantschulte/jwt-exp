const jwtAuth = require('express-jwt');

module.exports = function () {
  return jwtAuth({
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER
  });
}

