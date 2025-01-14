import { Router } from "express";
import authRouter from "./routes/auth";
import employerRouter from "./routes/employer";
import jobRouter from "./routes/job";

const router = Router()

router.use('/auth', authRouter)

router.use('/employers', employerRouter)

router.use('/jobs', jobRouter)

export default router

