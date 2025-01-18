
import requestValidator from '@/utils/request-validator'
import responseValidator from '@/utils/response-validator'
import { zPassword } from '@/utils/validator'
import z from 'zod'

export const validateRegistrationRequest = requestValidator({
    body: z.object({
        name: z.string().min(3, 'Name must be at least 3 charecters long'),
        email: z.string().email('Please enter valid email address'),
        password: zPassword
    }),
})

export const validateLoginRequest = requestValidator({
    body: z.object({
        email: z.string().email('Please enter valid email address'),
        password: zPassword
    })
})

export const validateLoginResponse = responseValidator(
    z.object({
        accessToken: z.string(),
        refreshToken: z.string()
    })
)