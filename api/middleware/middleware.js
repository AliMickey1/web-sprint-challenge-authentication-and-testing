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
            // const user = await Users.findBy({ username })
            const [user] = await db('users').where('username', username)
                .select('username')

                    console.log(`
                    users: ${user}
                    username: ${username}`)

            

            // if(user) {
            //     next()
            // }
             if(!user) {
                console.log('failed in middleware')
            //   next({ status: 401, message: 'Invalid credentials' })
            res.json({
                status: 401, 
                message: 'Invalid credentials'
            })
            } else if (!username || !password) {
                // next({ status: 401, message: 'username and password required' })
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