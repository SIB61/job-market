import { handleLoginRequest, handleRegistrationRequest } from "@/controllers/auth";
import { controller } from "@/utils/controller";
import { Router } from "express";

// /api/auth
const authRouter = Router()

authRouter.post('/register', controller(handleRegistrationRequest))
authRouter.post("/login",controller(handleLoginRequest))

export default authRouter