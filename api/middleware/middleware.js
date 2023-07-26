// const Users = require('../Users/userModel')
const db = require('../../data/dbConfig')



async function checkUsernameFree (req, res, next) {
    try{  
        const { username } = req.body
    //   const user = await Users.findBy({ username: req.body.username })
    const [user] = await db('users').where('username', username)
        .select('username')
        // console.log(user)
        if (!user){
            next()
        }
        else if(user.username) {
          res.json({ 
            status: 422, 
            message: 'Username taken' 
        })
        }  
    }
      catch(err) {
        next(err)
      }
    }
  
    async function checkLoginCred (req, res, next) {
        try{
        const {username, password} = req.body

        //   const user = await Users.findBy({ username: req.body.username })
        const [user] = await db('users').where('username', username)
            .select('username')    
        if (!username || !password) {
            res.status(401).json('username and password required')

            // res.json({
            //         status: 401, 
            //         message: 'username and password required'
            //     })
        }  else if(user === null || user === undefined ) {
            res.status(401).json('Invalid credentials')
            // res.json({
            //     status: 401, 
            //     message: 'Invalid credentials'
            //   })
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