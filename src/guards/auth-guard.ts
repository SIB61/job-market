import { HttpError } from "@/utils/http-error";
import { NextFunction, Request, Response } from "express";

export const authGuard = () => (req: Request, res: Response, next: NextFunction) => {
    req.user ? next() : next(new HttpError({ statusCode: 401, message: "Unauthenticated" }))
}