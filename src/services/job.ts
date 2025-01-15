import JobModel from "@/models/job";
import { getUserFromReq } from "@/utils/controller";
import { HttpError } from "@/utils/http-error";
import { Request, Response } from "express";

export const createJob = async (req: Request, res: Response) => {
  const { id: employerId } = getUserFromReq(req)!;
  const job = req.body;
  job.employerId = employerId;
  const newJob = await JobModel.create(job);
  return newJob;
};

export const updateJob = async (req: Request, res: Response) => {
  const { id: employerId } = getUserFromReq(req)!;
  const { jobId } = req.query;
  const updatedJobDetails = req.body;
  const updatedJob = await JobModel.findOneAndUpdate(
    { _id: jobId, employerId: employerId },
    updatedJobDetails,
    { new: true },
  );
  if (!updatedJob) {
    throw new HttpError({ message: "Cannot update this job", statusCode: 404 });
  }
  return updatedJob;
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id: employerId } = getUserFromReq(req)!;
  const { jobId } = req.query;
  const deletedJob = await JobModel.deleteOne({
    _id: jobId,
    employerId: employerId,
  });
  if (!deletedJob.deletedCount) {
    throw new HttpError({ message: "Cannot delete this job", statusCode: 404 });
  }
};

export const getJobList = async (props:{employerId?:string, title?:}) => {
  const query: { employerId?: string; title?: any } = {};
  const pageSize = Number(req.query.page_size) || Number.MAX_SAFE_INTEGER;
  const pageNumber = Number(req.query.page_number) || 1;

  if (typeof req.query.employerId === "string") {
    query.employerId = req.query.employerId;
  }

  if (typeof req.query.title === "string") {
    query.title = { $text: { $search: req.query.title } };
  }

  const jobs = await JobModel.find(query)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  return jobs;
};

