import { NextFunction, Request, Response } from "express"
import ApiResponseType from "../enums/api-response-type"
import { HttpError } from "../utils/http-error"
import logger from "@/utils/logger";

const errorResponseMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: HttpError;
  if (err instanceof HttpError) {
    error = err;
  } else if (err instanceof Error) {
    logger.info("++ error in ", req.method, ":", req.originalUrl, err)
    error = new HttpError({
      statusCode: 500,
      message: "Internal Server Error",
      error: err,
    });
  } else {
    error = new HttpError({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }

  return res.status(error.statusCode).json({
    type: ApiResponseType.ERROR,
    message: error.message,
    error: process.env.NODE_ENV == "production" ? undefined : err.stack,
    statusCode: res.statusCode,
    result: error.result,
  });
}

export default errorResponseMiddleware