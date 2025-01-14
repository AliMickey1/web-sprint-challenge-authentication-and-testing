const router = require('express').Router();
const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs')
const { checkLoginCred, checkUsernameFree, validLogin } = require('../middleware/middleware')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../Secrets/secrets')

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


router.post('/register', validLogin, checkUsernameFree, async (req, res) => {

 try{
    const { username, password } = req.body


    const hash = await bcrypt.hashSync(password, 8)

      const credentials = {
        username,
        password: hash
      }

      const newOne = await db('users').insert(credentials)
      const [result] = await db('users').where('id', newOne)
      res.status(201).json(result)

    } catch(err) {
      res.status(500).json({ message: err.message })
    }
});


router.post('/login', validLogin, checkLoginCred, (req, res) => {
  try{
      const {id, username, password} = req.body
      
      db('users').where('username', username).first()
      .then(users => {
          const valid = bcrypt.compareSync(password, users.password)
          console.log(`valid: ${valid}`)
            const user = {
              id,
              username,
              password
            }
          const token = buildToken(user)
         if(valid === true) {
            res.status(200).json({ 
              message: `welcome, ${username}`,
              token: token,
            }) 
          } else {
              res.status(401).json('Invalid credentials')
          }
        })
      }
      catch(err) {
        res.status(500).json({ message: err.message })
      }
});

module.exports = router;



// router.post('/register', checkUsernameFree, async (req, res) => {
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



      
      // router.post('/login', checkLoginCred, (req, res) => {

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