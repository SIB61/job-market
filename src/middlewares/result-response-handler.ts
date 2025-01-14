import { NextFunction, Request, Response } from "express"
import ApiResponseType from "../enums/api-response-type"
import { HttpError } from "../utils/http-error"

export const errorResponseHandler = async (req: Request, res: Response, next: NextFunction) => {
  const result = await next()
}
