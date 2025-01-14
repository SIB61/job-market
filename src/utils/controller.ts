import ApiResponseType from "@/enums/api-response-type"
import { Request, Response } from "express"
import { HttpError } from "./http-error"

export const controller = (handler: (req: Request, res: Response) => Promise<any>
) => {
  return async (req: Request, res: Response) => {
    try {
      const result = await handler(req, res)
      const response = {
        type: ApiResponseType.RESULT,
        error: null,
        statusCode: res.statusCode,
        result: result
      }
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
        message: error.message,
        error: process.env.NODE_ENV == 'prod' ? null : error.stack,
        statusCode: res.statusCode,
        result: error.result
      })
    }
  }
}
