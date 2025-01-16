import { handleGetApplicationDetails, handleGetApplicationList, handleJobApply } from "@/controllers/application";
import { authGuard } from "@/guards/auth-guard";
import { Router } from "express";

//api/job/:jobId/applications
const applicationRouter = Router({ mergeParams: true })

applicationRouter.post('/', handleJobApply)

applicationRouter.get('/', authGuard(), handleGetApplicationList)

applicationRouter.get('/:applicationId', authGuard(), handleGetApplicationDetails)

export default applicationRouter;