// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')
const Users = require('./Users/userModel')
// const Auth = require('./auth/auth-router')


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
  test('created user in db', async () => {
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
  
  test('returns all jokes from authorized list', async () => {
    await request(server).post('/api/auth/register').send(user1)
    const res = await request(server).post('/api/auth/login').send(user1)
    const info = await request(server).get('/api/jokes').set('Authorization', `${res.body.token}`)
    expect(info.body).toHaveLength(3)
  })
})

describe('[POST] /register', ()=> {
  test('successful registration', async ()=> {
    const res = await request(server).post('/api/auth/register').send(user2)
    expect(res.status).toBe(201)
  })

  test('error when no password', async ()=> {
    const res = await request(server).post('/api/auth/register').send(nopass)
    expect(res.status).toBe(401)
  })

})

describe('[POST] /login', ()=> {
  test('successful login', async ()=> {
    await request(server).post('/api/auth/register').send(user2)
    const res = await request(server).post('/api/auth/login').send(user2)
    expect(res.status).toBe(200)
    expect(res.body.message).toContain('welcome')
  })
  test('error when no username', async ()=> {
    await request(server).post('/api/auth/register').send(user1)
    const res = await request(server).post('/api/auth/login').send(nouser)
    expect(res.status).toBe(401)
  })

})