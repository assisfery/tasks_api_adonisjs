import User from 'App/Models/User'

export default class UserRepository {

    public static async findByEmail(email)
    {
        return await User.findBy('email', email)
    }

    public static async create(email, password, role)
    {
        const user = new User()
        user.email = email
        user.password = password
        user.role = role
        await user.save()

        return user
    }

}