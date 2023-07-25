const Users = require('../Users/userModel')


async function checkUsernameFree (req, res, next) {
    try{  
      const user = await Users.findBy({ username: req.body.username })
        if(user) {
          next({ status: 422, message: 'Username taken' })
        } else {
          next()
        }
      }
      catch(err) {
        next(err)
      }
    }
  
    async function checkUsernameExists(req, res, next) {
        try{
            const user = await Users.findBy({ username: req.body.username })
            if(user) {
              req.user = user
              next()
            } else {
              next({ status: 401, message: 'Invalid credentials' })
            }
            
        }
        catch(err) {
          next(err)
        }
        
        }
  
        // On FAILED login due to `username` or `password` missing from the request body,
        // the response body should include a string exactly as follows: "username and password required".

    async function checkRequiredInfo (req, res, next) {
        try{
            const user = await Users.findBy({ username: req.body.username })
            const pass = await Users.findBy({ password: req.body.password })

            if(!user || !pass) {
                next({ status: 401, message: 'username and password required' })
            } else {
                next()
            }
        }
        catch(err) {
            next(err)
        }
    } 
  module.exports = {
    checkUsernameExists,
    checkUsernameFree,
    checkRequiredInfo,
  }