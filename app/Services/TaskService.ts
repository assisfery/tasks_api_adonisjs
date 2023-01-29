import TaskRepository from "App/Repositories/TaskRepository"
import NotifyService from "App/Services/NotifyService"

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

    public static async editTask(user_id, task_id, summary, status)
    {
        const task = await TaskRepository.editTask(task_id, summary, status)

        if(!task)
        {
            return {
                success: false,
                message: "task not found",
            }
        }

        if(status == 1)
        {
            NotifyService.sendToQueue({
                message: "The tech " + user_id + " performed the task " + task.id + " on date " + task.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss')
            })
        }

        return {
            success: true,
            message: "task edited successfully",
            task
        }
    }

    public static async editUserTask(user_id, task_id, summary, status)
    {
        const task = await TaskRepository.editUserTask(user_id, task_id, summary, status)

        if(!task)
        {
            return {
                success: false,
                message: "task not found",
            }
        }

        if(status == 1)
        {
            NotifyService.sendToQueue({
                message: "The tech " + user_id + " performed the task " + task.id + " on date " + task.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss')
            })
        }

        return {
            success: true,
            message: "task edited successfully",
            task
        }
    }

    public static async delete(task_id)
    {
        const task = await TaskRepository.delete(task_id)

        if(!task)
        {
            return {
                success: false,
                message: "task not found",
            }
        }

        return {
            success: true,
            message: "task deleted successfully",
            task
        }
    }
}