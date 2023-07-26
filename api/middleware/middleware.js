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
  
    async function checkLoginCred (req, res, next) {
        try{
            const {username, password} = req.body
            // const user = await Users.findBy({ username: req.body.username })
            if(username && password) {
                req.username = username
                req.password = password
              next()
            } else if (!username || !password) {
                next({ status: 401, message: 'username and password required' })
            } else {
              next({ status: 401, message: 'Invalid credentials' })
            }
            
        }
        catch(err) {
          next(err)
        }
        
        }
  

  module.exports = {
    checkLoginCred,
    checkUsernameFree,

  }