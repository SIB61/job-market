import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "./http-response";

export const controller = (
  handler: (...args: any[]) => Promise<any>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res);
      const response = result instanceof HttpResponse ? result :
        new HttpResponse({ result })
      return res.status(response.statusCode).json(response);
    } catch (e) {
      next(e)
    }
  };
};