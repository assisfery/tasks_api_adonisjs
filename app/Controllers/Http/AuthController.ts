// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

    public async signup({ request, response }) {
    
        const signupSchema = schema.create({
            email: schema.string([
                rules.email()
            ]),
            password: schema.string(),
        })
        
        const payload = await request.validate({ schema: signupSchema })

        const foundUser = await User.findBy('email', request.input('email'))
        if(foundUser)
        {
            return response.abort({
                success: false,
                message: "email is used"
            }, 400)
        }

        const user = new User()
        user.email = request.input('email')
        user.password = request.input('password')
        user.role = request.input('role')
        await user.save()

        return {
            success: true,
            message: "account created successfully",
            user
        }
    }

    public async login({ request, response, auth }) {
    
        const loginSchema = schema.create({
            email: schema.string([
                rules.email()
            ]),
            password: schema.string(),
        })
        
        const payload = await request.validate({ schema: loginSchema })

        try {
            const token = await auth.use('api').attempt(request.input('email'), request.input('password'))

            return {
                success: true,
                message: "login successfully",
                token
            }            
        } catch
        {
            return response.unauthorized({
                success: false,
                message: "invalid credentials",
            })
        }
    }

    public async me({ auth }) {
    
        return auth.user;
    }

}
