import { Router } from "express";
import authRouter from "./routes/auth";
import jobRouter from "./routes/job";
import applicationRouter from "./routes/application";

const router = Router()

router.use("/auth", authRouter)

router.use("/jobs", jobRouter)

router.use('/jobs/:jobId/applications', applicationRouter)

export default router

