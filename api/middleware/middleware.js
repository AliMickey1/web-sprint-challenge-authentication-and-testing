const Users = require('../Users/userModel')
const db = require('../../data/dbConfig')



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
            const [user] = await db('users').where('username', username)


            if(user === null || user === undefined) {
                console.log('failed in middleware')
            res.json({
                status: 401, 
                message: 'Invalid credentials'
            })
            } else if (!username || username === null || password === null || !password) {
                res.json({
                        status: 401, 
                        message: 'username and password required'
                    })
            }  
            else {
                req.username = username
                req.password = password
                console.log('passed')
              next()
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