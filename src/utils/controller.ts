import ApiResponseType from "@/enums/api-response-type"
import { Request, Response } from "express"
import { HttpError } from "./http-error"
import { requestResponseValidator, RequestResponseValidator } from "./request-response-validator"

export const controller = (handler: (req: Request, res: Response) => Promise<any>,validator: RequestResponseValidator = requestResponseValidator()) => {
  return async (req: Request, res: Response) => {
    try {
      validator.validateRequest(req)
      const result = await handler(req, res)
      const response = {
        type: ApiResponseType.RESULT,
        error: null,
        statusCode: res.statusCode,
        result: result
      }
      validator.validateResponse(response)
      return res.json(response)
    } catch (err) {

      let error: HttpError
      if (err instanceof HttpError) {
        error = err
      } else if (err instanceof Error) {
        error = new HttpError({
          statusCode: 500,
          message: 'Internal Server Error',
          error: err
        })
      } else {
        error = new HttpError({
          statusCode: 500,
          message: 'Internal Server Error',
        })
      }

      return res.status(error.statusCode).json({
        type: ApiResponseType.ERROR,
        error: process.env.NODE_ENV == 'prod' ? null : error.stack,
        statusCode: res.statusCode,
        result: error.result
      })
    }
  }
}
