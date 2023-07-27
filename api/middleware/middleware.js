// const Users = require('../Users/userModel')
const db = require('../../data/dbConfig')

async function validLogin (req, res, next) {
    try {
        const {username, password} = req.body
    
        if ((username === null) || (username === undefined) || (username === '')) {
            res.status(401).json('username and password required')
        }
        else if ((password === null) || (password === undefined) || (password === '')) {
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

    const [user] = await db('users').where('username', username)
        .select('username')
        if (!user){
            next()
        }
        else if(user.username) {
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


        const [user] = await db('users').where('username', username)
            .select('username')    
        if(user === null || user === undefined ) {
            res.status(401).json('Invalid credentials')

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
  

  module.exports = {
    checkLoginCred,
    checkUsernameFree,
    validLogin
  }