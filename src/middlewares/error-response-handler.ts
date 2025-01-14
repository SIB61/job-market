import { NextFunction, Request, Response } from "express"
import ApiResponseType from "../enums/api-response-type"
import { HttpError } from "../utils/http-error"

export const errorResponseHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const error = err instanceof HttpError ? err : new HttpError({
    statusCode: 500,
    message: 'Internal Server Error',
    error: err
  })

  console.error("++ error:", req.method, req.originalUrl, err)

  res.status(error.statusCode).json({
    type: ApiResponseType.ERROR,
    result: error.result,
    message: error.message,
    error: process.env.NODE_ENV == 'dev' ? error.stack : null
  })
}
