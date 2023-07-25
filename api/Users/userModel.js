const db = require('../../data/dbConfig')

/**
  resolves to an ARRAY with all users, each user having { id, username }
 */
  async function find() {
    const users = await db('users')
    .select('id', 'username')
    return users
  }
  
  /**
    resolves to an ARRAY with all users that match the filter condition
   */
  async function findBy(filter) {
    const [users] = await db('users')
    .where('id', filter).orWhere('username', filter)
    .orWhere('password', filter)
  
     return users
  }
  
  /**
    resolves to the user { id, username } with the given id
   */
  async function findById(id) {
    const users = await db('users')
    .select('id', 'username')
      .where('id', id)
      return users
  }

  /**
  resolves to the newly inserted user { id, username }
 */
async function add(user) {
    const newId = await db('users').insert(user)
    const newUser = await db('users')
      .select('id', 'username')
      .where('id', newId)
      .first()
    
    return findById(newUser)
}



module.exports = {
    find,
    findBy,
    findById, 
    add,
}