import { createJob, deleteJob, getJobDetails, searchJobs, toggleJobActivation, updateJob } from "@/services/job";
import { controller } from "@/utils/controller";
import { HttpResponse } from "@/utils/http-response";
import { validateJobActivationRequest, validateJobCreateRequest, validateJobSearchRequest, validateJobUpdateRequest } from "@/validators/job";
import { Request, Response } from "express";

export const handleCreateJob = controller(async (req: Request, res: Response) => {
  validateJobCreateRequest(req)
  const { id: employerId } = req.user!
  const job = req.body;
  const result = await createJob({ job, employerId })
  return new HttpResponse({ statusCode: 201, result })
});

export const handleUpdateJob = controller(async (req: Request) => {
  validateJobUpdateRequest(req)
  const { id: employerId } = req.user!
  const { jobId } = req.params as { jobId: string };
  const jobUpdates = req.body;
  const result = await updateJob({ jobUpdates, employerId, jobId })
  return result;
});

export const handleDeleteJob = controller(async (req: Request) => {
  const { id: employerId } = req.user!;
  const { jobId } = req.params as { jobId: string };
  await deleteJob({ employerId, jobId })
});

export const handleGetJobDetails = controller(async (req: Request) => {
  const jobId = req.params.jobId as string
  return getJobDetails({ jobId })
})

export const handleJobSearch = controller(async (req: Request) => {
  validateJobSearchRequest(req)
  const result = await searchJobs(req.body)
  return result
})

export const handleJobApplicationDeactivation = controller(async (req: Request) => {
  validateJobActivationRequest(req)
  const jobId = req.params.jobId as string
  const isActive = req.body.isActive
  const employerId = req.user!.id
  await toggleJobActivation({ jobId, employerId, isActive })
})