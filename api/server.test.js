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
      await Users.add(user2)
      user = await db('users')
      expect(user).toHaveLength(2)
  })

})

// describe('[POST] /api/auth/register', ()=> {
//   test('adds a user to the database', async () => {
//     const res = await request(server).post('/api/auth/register').send(user1)
//     expect(res.body).toHaveLength(1)
//   })
//   it('responds with 200 ok', async () => {
//       const res = await request(server).get('/api/auth/register')
//       expect(res.status).toBe(200)
//   })
// })

// describe('[POST] /api/auth/login', () => {
//   it('responds with 201', async () => {
//       const res = await request(server).post('/api/auth/login')
//       expect(res.status).toBe(201)
//   })
// })