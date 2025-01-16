import { createApplication, getApplicationDetails, getApplicationList } from "@/services/application";
import { controller } from "@/utils/controller";
import { validateGetApplicationListRequest, validateJobApplyRequest } from "@/validators/application";
import { Request } from "express";

export const handleJobApply = controller(async (req: Request) => {
    validateJobApplyRequest(req)
    const application = req.body
    const jobId = req.params.jobId as string
    await createApplication({ application, jobId })
})

export const handleGetApplicationList = controller(async (req: Request) => {
    validateGetApplicationListRequest(req)
    const jobId = req.params.jobId as string
    const pageNumber = Number(req.query.page_number)
    const pageSize = Number(req.query.page_size)
    const employerId = req.user!.id
    const result = await getApplicationList({ jobId, employerId, pageNumber, pageSize })
    return result
})

export const handleGetApplicationDetails = controller(async (req: Request) => {
    return getApplicationDetails({ applicationId: req.params.applicationId as string, employerId: req.user!.id, jobId: req.params.jobId })
})