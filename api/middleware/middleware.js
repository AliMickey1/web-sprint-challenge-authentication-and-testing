const User = require('../Users/userModel')


async function validLogin (req, res, next) {
    try {
        const {username, password} = req.body
        if(!username ) {
            res.status(401).json('username and password required')
        } else if(!password) {
            res.status(401).json('username and password required')
        } 
        else {
            req.username = username
            req.password = password
            next()
        }
    }
    catch(err) {
        next(err)
    }
}


async function checkUsernameFree (req, res, next) {
    try{  
        const { username } = req.body

    const taken = await User.findUsername(username)
    console.log(`${taken}`)
    if(!taken) {
        next()
    }else {
          res.status(422).json('Username taken')       
         }  
    }
      catch(err) {
        next(err)
      }
    }
  
    async function checkLoginCred (req, res, next) {
        try{
        const {username, password} = req.body
       await User.findUsername(username) 
            .then(user => {
        if(user === null || user === undefined ) {
            res.status(401).json('Invalid credentials')
         } else {
            req.username = username
            req.password = password
            next()
        } 
    })    
        }
        catch(err) {
          next(err)
        }
        
        }
  

  module.exports = {
    checkLoginCred,
    checkUsernameFree,
    validLogin
  }