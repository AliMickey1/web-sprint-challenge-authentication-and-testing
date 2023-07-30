const db = require('../../data/dbConfig')

  function findUsername(username) {
  return db('users').where('username', username).first()
  }
  
  async function findById(id) {
    const users = await db('users')
    .select('id', 'username')
      .where('id', id)
      return users
  }

async function add(user) {
    const newId = await db('users').insert(user)
    const newUser = await db('users')
      .select('id', 'username')
      .where('id', newId)
      .first()
    
    return findById(newUser)
}

function checkPassword(password) {
  return db('users').where('password', password).first()
}


module.exports = {
    findUsername,
    findById, 
    add,
    checkPassword
}