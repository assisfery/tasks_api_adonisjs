import UserRepository from "App/Repositories/UserRepository"

export default class UserService {

    public static async signup(email, password, role)
    {
        const foundUser = await UserRepository.findByEmail(email)
        if(foundUser)
        {
            return {
                success: false,
                message: "email is already used"
            }
        }

        const user = await UserRepository.create(email, password, role)
        return {
            success: true,
            message: "account created successfully",
            user
        }
    }

    public static async login(auth, email, password)
    {
        try {
            const token = await auth.use('api').attempt(email, password)

            return {
                success: true,
                message: "login successfully",
                token
            }            
        }
        catch
        {
            return {
                success: false,
                message: "invalid credentials",
            }
        }
    }

}