import ApiResponseType from '@/enums/api-response-type'
import { Request } from 'express'
import { z, ZodError } from 'zod'
import { HttpError } from './http-error'

export type RequestResponseValidator = {
    validateRequest: (req: Request) => void,
    validateResponse: (res: any) => any
}

export const requestResponseValidator = ({
    reqBodySchema = z.object({}).nullish(),
    reqQuerySchema = z.object({}).nullish(),
    resResultSchema = z.undefined()
}: any = {}): RequestResponseValidator => {
    return {
        validateRequest(req: Request) {
            try {
                req.body = reqBodySchema.parse(req.body)
                req.query = reqQuerySchema.parse(req.query)
            } catch (e) {
                if (e instanceof ZodError) {
                    throw new HttpError({ statusCode: 400, message: e.issues[0].message, error: e })
                }
                throw e
            }
        },
        validateResponse(response: any) {
                response.result = resResultSchema.parse(response.result)
        }
    }
}
