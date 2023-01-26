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

  public async getAll({auth, response}: HttpContextContract) {

    if(auth.user?.isManager())
    {
      return await TaskService.getAll()
    }
    else
    {
      return response.unauthorized("no access")
    }

  }

  // public async edit({}: HttpContextContract) {}

  public async update({params, auth, request, response}: HttpContextContract) {

    const createTaskSchema = schema.create({
        summary: schema.string(),
        status: schema.number(),
    })
    
    await request.validate({ schema: createTaskSchema })

    if(auth.user?.isManager())
    {
      var result = await TaskService.editTask(
        params.id,
        request.input('summary'),
        request.input('status')
      )
    }
    else
    {
      var result = await TaskService.editUserTask(
        auth.user?.id,
        params.id,
        request.input('summary'),
        request.input('status')
      )
    }

    if(!result.success)
    {
      response.status(404)
      return result
    }

    return result
  }

  public async destroy({}: HttpContextContract) {}

  
}
