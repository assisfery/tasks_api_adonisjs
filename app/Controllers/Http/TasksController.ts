import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskService from 'App/Services/TaskService'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class TasksController {

  public async index({auth}: HttpContextContract) {
    return await TaskService.getAllUserTasks(auth.user ? auth.user.id : null)
  }

  // public async create({}: HttpContextContract) {}

  public async store({auth, request}: HttpContextContract) {

    const createTaskSchema = schema.create({
        summary: schema.string(),
    })
    
    await request.validate({ schema: createTaskSchema })

    const result = await TaskService.create(
        auth.user ? auth.user.id : null,
        request.input('summary')
    )

    return result
  }

  public async show({auth, params, response}: HttpContextContract) {

    if(auth.user?.isManager())
    {
      var result = await TaskService.getTaskById(params.id)
    }
    else
    {
      var result = await TaskService.getUserTaskById(auth.user?.id, params.id)
    }

    if(!result)
    {
      response.status(404)
      return "Not found"
    }

    return result
  }

  // public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
