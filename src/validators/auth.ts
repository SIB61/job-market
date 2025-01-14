
import requestValidator from '@/utils/request-validator'
import z from 'zod'

export const validateRegistrationRequest = requestValidator({
    body: z.object({
        name: z.string().min(3, 'Name must be at least 3 charecters long'),
        email: z.string().email('Please enter valid email address'),
        password:
            z.string()
                .min(8, 'Password must be at least 8 characters long')
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                    message:
                        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                })
    }),
})

export const validateLoginRequest = requestValidator({
    body: z.object({
        email: z.string().email('Please enter valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters long')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            })
    })
})

export const validateLoginResponse = (result:any) => {
 return z.object({
    accessToken: z.string(),
    refreshToken: z.string()
 }).parse(result)
}

export const validateRegistrationResponse = (result:any) => {
    return z.void().nullish().parse(result)
}