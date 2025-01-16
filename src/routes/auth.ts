import { handleLoginRequest, handleRegistrationRequest } from "@/controllers/auth";
import { authGuard } from "@/guards/auth-guard";
import { Router } from "express";

// /api/auth
const authRouter = Router()

authRouter.post('/register', handleRegistrationRequest)
authRouter.post("/login", handleLoginRequest)

export default authRouter