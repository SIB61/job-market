import { loginEmployer, registerEmployer } from "@/services/auth";
import { validateLoginRequest, validateRegistrationRequest } from "@/validators/auth";
import { validateCreateEmployeeRequest } from "@/validators/employer";
import { Request, Response } from "express";

export const handleRegistrationRequest = async (req: Request, res: Response) => {
    validateRegistrationRequest(req)
    await registerEmployer(req.body)
}

export const handleLoginRequest = async (req: Request, res: Response) => {
    validateLoginRequest(req)
    const result = await loginEmployer(req.body)
    return result
}


