import ApiResponseType from "@/enums/api-response-type";
import { Request, Response } from "express";
import { HttpError } from "./http-error";
import { verify } from "jsonwebtoken";
import { UserToken } from "@/types/user-token";

export const getUserFromReq = (req: Request): UserToken | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }

  try {
    return verify(token, process.env.JWT_SECRET!!) as UserToken;
  } catch (err) {
    return null;
  }
};

export const controller = (
  handler: (req: Request, res: Response) => Promise<any>,
  { authenticated = false } = {},
) => {
  return async (req: Request, res: Response) => {
    try {
      if (authenticated) {
        const user = getUserFromReq(req);
        if (!user) {
          throw new HttpError({
            statusCode: 401,
            message: "Unauthorized",
          });
        }
      }
      const result = await handler(req, res);
      const response = {
        type: ApiResponseType.RESULT,
        error: null,
        statusCode: res.statusCode,
        result: result,
      };
      return res.json(response);
    } catch (err) {
      let error: HttpError;
      if (err instanceof HttpError) {
        error = err;
      } else if (err instanceof Error) {
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
        error: process.env.NODE_ENV == "prod" ? null : error.stack,
        statusCode: res.statusCode,
        result: error.result,
      });
    }
  };
};
