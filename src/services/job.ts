import JobModel from "@/models/job";
import { Job } from "@/types/job";
import { findPaginatedData } from "@/utils/db";
import { HttpError } from "@/utils/http-error";

export const createJob = async ({ job, employerId }: { job: Job, employerId: string }) => {
  job.employerId = employerId;
  const newJob = await JobModel.create(job);
  return newJob;
};

export const updateJob = async ({ jobUpdates, employerId, jobId }: { jobUpdates: Job, employerId: string, jobId: string }) => {
  const updatedJob = await JobModel.findOneAndUpdate(
    { _id: jobId, employerId: employerId },
    jobUpdates,
    { new: true },
  );
  if (!updatedJob) {
    throw new HttpError({ message: "Cannot update this job", statusCode: 404 });
  }
  return updatedJob;
};

export const deleteJob = async ({ employerId, jobId }: { employerId: string, jobId: string }) => {
  const result = await JobModel.deleteOne({
    _id: jobId,
    employerId: employerId,
  });
  if (!result.deletedCount) {
    throw new HttpError({ message: "Cannot delete this job", statusCode: 404 });
  }
};

export const getJobDetails = async (props: { jobId: string }) => {
  const job = await JobModel.findById(props.jobId)
  if (!job) {
    throw new HttpError({ statusCode: 404, message: "Job not found" })
  }
  return job
}

export const searchJobs = async (props: { title?: string, location?: string, employerId?: string, maxSalary?: number, minSalary?: number, pageNumber: number, pageSize: number }) => {
  const query: any = {}
  if (props.title) {
    query.title = { $regex: props.title, $options: 'i' }
  }
  if (props.location) {
    query.location = { $regex: props.location, $options: 'i' }
  }
  if (props.maxSalary) {
    query['salary.max'] = {
      $lte: props.maxSalary
    }
  }
  if (props.minSalary) {
    query['salary.max'] = {
      $gte: props.minSalary,
      ...query['salary.max']
    }
  }
  if (props.employerId) {
    query.employerId = props.employerId
  }
  const jobs = findPaginatedData(JobModel, query, props.pageNumber, props.pageSize)
  return jobs
}

export const toggleJobActivation = async (props: { jobId: string, employerId: string, isActive: boolean }) => {
  const update = await JobModel.updateOne({ _id: props.jobId, employerId: props.employerId }, { isActive: props.isActive })
  if (!update.matchedCount) {
    throw new HttpError({ statusCode: 404, message: "Job was not found" })
  }
}