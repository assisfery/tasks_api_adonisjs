// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import UserService from 'App/Services/UserService'

export default class AuthController {

    public async signup({ request, response }) {
    
        const signupSchema = schema.create({
            email: schema.string([
                rules.email()
            ]),
            password: schema.string(),
        })
        
        await request.validate({ schema: signupSchema })

        const result = await UserService.signup(
            request.input('email'),
            request.input('password'),
            request.input('role')
        )

        if(!result.success)
        {
            return response.abort(result, 400)
        }

        return result;
    }

    public async login({ request, response, auth }) {
    
        const loginSchema = schema.create({
            email: schema.string([
                rules.email()
            ]),
            password: schema.string(),
        })
        
       await request.validate({ schema: loginSchema })

        const result = await UserService.login(
            auth,
            request.input('email'),
            request.input('password')
        )

        if(!result.success)
        {
            return response.unauthorized(result)
        }

        return result;
    }

    public async me({ auth }) {
    
        return auth.user;
    }

}
