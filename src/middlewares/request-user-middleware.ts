import { UserToken } from "@/types/user-token";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const requestUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1]!!;
        req.user = verify(token, process.env.JWT_SECRET!!) as UserToken;
    } catch (err) {
    } finally {
        next()
    }
}

export default requestUserMiddleware