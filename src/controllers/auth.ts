import { loginEmployer, registerEmployer } from "@/services/auth";
import { controller } from "@/utils/controller";
import { validateLoginRequest, validateLoginResponse, validateRegistrationRequest } from "@/validators/auth";
import { Request, Response } from "express";

export const handleRegistrationRequest = controller(async (req: Request) => {
    validateRegistrationRequest(req)
    await registerEmployer(req.body)
})

export const handleLoginRequest = controller(async (req: Request) => {
    validateLoginRequest(req)
    const result = await loginEmployer(req.body)
    return validateLoginResponse(result)
})


