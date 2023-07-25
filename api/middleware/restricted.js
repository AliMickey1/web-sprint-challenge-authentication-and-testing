const { TokenExpiredError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken')
// const db = require('../../data/dbConfig')

module.exports = (req, res, next) => {
  if(req.session.user){
  next();
  } else if (!token) {
    next({ status: 401, message: 'token required'})
  } else if(TokenExpiredError){
    next({ status: 401, message: 'token invalid'})
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
