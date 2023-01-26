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

    public static async getUserTaskById(user_id, task_id)
    {
        return await TaskRepository.getUserTaskById(user_id, task_id)
    }

    public static async getTaskById(task_id)
    {
        return await TaskRepository.getTaskById(task_id)
    }

    public static async getAll()
    {
        return await TaskRepository.getAll()
    }
}