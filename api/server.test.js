// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')
const Users = require('./Users/userModel')
const Auth = require('./auth/auth-router')


test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async ()=> {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

const user1 = {username: 'Peter Pan', password: 'stay_young' }
const user2 = {username: 'Tinkerbell', password: 'magic'}

describe('User model functions', () => {
  it('created user in db', async () => {
      let user
      await Users.add(user1)
      user = await db('users')
      expect(user).toHaveLength(1)
  })
  it('inserted user', async () => {
      const user = await Users.add(user1)
      expect(user).toMatchObject({ id:1,...user })

  })
})