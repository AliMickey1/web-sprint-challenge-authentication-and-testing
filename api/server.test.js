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
const nopass = {username: 'This Guy', password: ''}
const nouser = {username: '', password: '1234'}

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

describe('[GET] /jokes', () => {
  
  it('error when no token is present', async () => {
    // await request(server).post('/api/auth/register').send(user1)
    // await request(server).post('/api/auth/login').send(user1)
    // const info = await request(server).get('/api/jokes')
    // expect(info.body.message).toEqual('token required')
  })

  test('returns authorized list of jokes', async () => {
    await request(server).post('/api/auth/register').send(user1)
    const res = await request(server).post('/api/auth/login').send(user1)
    const info = await request(server).get('/api/jokes').set('Authorization', `${res.body.token}`)
    expect(info.body).toHaveLength(3)
  })
})

describe('[POST] /register', ()=> {
  it('successful registration', async ()=> {
    const res = await request(server).post('/api/auth/register').send(user2)
    expect(res.status).toBe(201)
  })

  it('error when no password', async ()=> {
    const res = await request(server).post('/api/auth/register').send(nopass)
    expect(res.status).toBe(401)
    // expect(res.body.message).toBe('username and password required')
    // await request(server).post('/api/auth/login').send(user2)
    // const info = await request(server).get()
  })

})

// describe('[POST] /login', ()=> {
//   it('error when no username', async ()=> {

//   })

//   it('error when no password', async ()=> {

//   })

// })