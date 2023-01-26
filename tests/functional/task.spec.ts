import { test } from '@japa/runner'
import { string } from '@ioc:Adonis/Core/Helpers'

test.group('Tasks', () => {

  test('create task', async ({ client }) => {

    const email = string.generateRandom(16) + "@yes.pt"

    await client.post('/auth/signup')
    .fields({
      email,
      password: "123"
    })

    const respToken = await client.post('/auth/login')
    .fields({
      email: email,
      password: "123"
    })

    const token = respToken.body().token.token

    const response = await client.post('/tasks')
    .bearerToken(token)
    .fields({
      "summary": "Yes we are doing"
    })

    response.assertStatus(200)
  })

  test('create and get task', async ({ client }) => {

    const email = string.generateRandom(16) + "@yes.pt"

    await client.post('/auth/signup')
    .fields({
      email,
      password: "123"
    })

    const respToken = await client.post('/auth/login')
    .fields({
      email: email,
      password: "123"
    })

    const token = respToken.body().token.token

    const respTask = await client.post('/tasks')
    .bearerToken(token)
    .fields({
      "summary": "Yes we are doing"
    })

    const response = await client.get('/tasks/' + respTask.body().id)
    .bearerToken(token)

    response.assertStatus(200)
  })

})
