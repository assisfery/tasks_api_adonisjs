import Task from 'App/Models/Task'

export default class TaskRepository {

    public static async getAllUserTasks(user_id)
    {
        return await Task
        .query()
        .where('user_id', user_id)
    }

    public static async create(user_id, summary)
    {
        const task = new Task()
        task.user_id = user_id
        task.summary = summary
        await task.save()
        
        return task
    }

    public static async getUserTaskById(user_id, task_id)
    {
        return await Task
        .query()
        .where('user_id', user_id)
        .where('id', task_id)
        .first()
    }

    public static async getTaskById(task_id)
    {
        return await Task.find(task_id)
    }

    public static async getAll()
    {
        return await Task.all()
    }

    public static async editTask(task_id, summary, status)
    {
        var task = await Task.find(task_id)

        if(task)
        {
            task.summary = summary
            task.status = status
            await task.save()
        }

        return task
    }

    public static async editUserTask(user_id, task_id, summary, status)
    {
        var task = await Task
        .query()
        .where('user_id', user_id)
        .where('id', task_id)
        .first()

        if(task)
        {
            task.summary = summary
            task.status = status
            await task.save()
        }

        return task
    }

}