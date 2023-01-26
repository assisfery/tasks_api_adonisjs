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

}