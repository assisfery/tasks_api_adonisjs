import { test } from '@japa/runner'
import { string } from '@ioc:Adonis/Core/Helpers'

test.group('Auth', () => {
  
  test('try get logged user info', async ({ client }) => {
    const response = await client.get('/auth/me')
    response.assertStatus(401)
  })

  test('try get login with invalid credentials', async ({ client }) => {
    const response = await client.post('/auth/login')
    .fields({
      email: "random_user@yes.pt",
      password: "123"
    })

    response.assertStatus(401)
  })

  test('try signup', async ({ client }) => {

    var randomEmail = string.generateRandom(32) + "@yes.pt"

    const response = await client.post('/auth/signup')
    .fields({
      email: randomEmail,
      password: "123"
    })

    response.assertStatus(200)
  })

  test('try login', async ({ client }) => {

    var randomEmail = string.generateRandom(32) + "@yes.pt"

    await client.post('/auth/signup')
    .fields({
      email: randomEmail,
      password: "123"
    })

    const response = await client.post('/auth/login')
    .fields({
      email: randomEmail,
      password: "123"
    })

    response.assertStatus(200)
  })

})
