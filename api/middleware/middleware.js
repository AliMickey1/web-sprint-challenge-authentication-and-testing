// const Users = require('../Users/userModel')
// const db = require('../../data/dbConfig')
const User = require('../Users/userModel')

async function validLogin (req, res, next) {
    try {
        const {username, password} = req.body
    
        if ((username === null) || (username === undefined) || (username === '')) {
            res.status(401).json('username and password required')
        }
        else if ((password === null) || (password === undefined) || (password === '')) {
            res.status(401).json('username and password required')
        }
        else if(!username || !password) {
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
        // const {username, password} = req.body

            
        const taken = await User.findUsername(req.body.username)
        // const passy = await User.checkPassword(password)

        // if(!taken || taken === null || taken === undefined ) {
        //     res.status(401).json('Invalid credentials')
        // } else if(passy === null || passy === undefined ) {
        //     res.status(401).json('Invalid credentials')
        // }

        if(!taken) {
            res.status(401).json('Invalid credentials')
        }
         else {
            // req.username = username
            // req.password = password
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
    validLogin
  }