const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../Secrets/secrets')


module.exports = (req, res, next) => {

  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err) {
        res.status(401).json('token invalid')       

        next()
      } else {
        req.decodedJWT = decoded
        next()
      }
    })
  } else {
    res.status(401).json('token required')       
    next()

  }

};
