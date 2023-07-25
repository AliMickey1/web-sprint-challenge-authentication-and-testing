const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../Users/userModel')
const { checkUsernameExists, checkUsernameFree, checkRequiredInfo } = require('../middleware/middleware')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../Secrets/secrets')




router.post('/register', checkUsernameFree, (req, res) => {
  // res.end('implement register, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
      const { username, password } = req.body
      const hash = bcrypt.hashSync(password, 8)

      const credentials = {
        username,
        password: hash
      }

      User.add(credentials)
        .then(save => {
          res.status(201).json(save)
          // res.json({
          //   status: 201, 
          //   message: `${save} has created an account`,
          //   save,
          // })
        })
        .catch(err => {
          console.log('implement register, please!')
          console.log(err)
        })
});

router.post('/login', checkUsernameExists, checkRequiredInfo, (req, res, next) => {
  // res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */

      // const { password } = req.body

      // const valid = bcrypt.compareSync(req.user.password, password)
      // if(valid) {
      //   req.session.user = req.user
      //   res.json({ message: `welcome, ${req.body.username}`})
      // } else if(!req.body.username || !password) {
      //   res.json({ status: 401, message: 'username and password required'})
      // }
      if (bcrypt.compareSync(req.body.password, req.user.password)) {
        const token = buildToken(req.user)
        res.json({ 
          message: `welcome, ${req.user.username}`,
          token,
        })
      } else {
        next({ status: 401, message: 'Invalid credentials'})
      }
  
      function buildToken(user) {
        const payload = {
          subject: user.id,
          username: user.username,
        }
        const options = {
          expiresIn: '1d'
        }
        return jwt.sign(payload, JWT_SECRET, options)
      }
});

module.exports = router;
