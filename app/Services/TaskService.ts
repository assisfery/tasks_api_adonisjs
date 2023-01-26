import TaskRepository from "App/Repositories/TaskRepository"

export default class TaskService {

    public static async getAllUserTasks(user_id)
    {
        return await TaskRepository.getAllUserTasks(user_id)
    }

    public static async create(user_id, summary)
    {
        return await TaskRepository.create(user_id, summary)
    }
}