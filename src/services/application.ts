import ApplicationModel from "@/models/application";
import JobModel from "@/models/job";
import { Application } from "@/types/application";
import { findPaginatedData } from "@/utils/db";
import { HttpError } from "@/utils/http-error";
import { sendRealTimeMessage } from "./socket-service";

export const createApplication = async (props: {
  jobId: string;
  application: Application;
}) => {
  const job = await JobModel.findById(props.jobId).select("_id employerId");
  if (!job) {
    throw new HttpError({ statusCode: 400, message: "The job was not found" });
  }
  if (!job.isActive) {
    throw new HttpError({
      statusCode: 422,
      message: "This job is no longer taking applications",
    });
  }
  const existingApplication = await ApplicationModel.exists({
    email: props.application.email,
    jobId: props.jobId,
  });
  if (existingApplication) {
    throw new HttpError({
      statusCode: 409,
      message: "Your have already applied for the job",
    });
  }
  props.application.jobId = props.jobId;
  props.application.employerId = job.employerId;
  const newApplication = ApplicationModel.create(props.application);
  await JobModel.updateOne(
    { _id: props.jobId },
    { $inc: { applicationCount: 1 } },
  );
  sendRealTimeMessage({
    to: job.employerId as string,
    event: "new_application",
    data: { message: "New application" },
  });
  return newApplication;
};

export const getApplicationList = async (props: {
  jobId: string;
  employerId: string;
  pageNumber: number;
  pageSize: number;
}) => {
  const query = { jobId: props.jobId };
  const applications = await findPaginatedData(
    ApplicationModel,
    query,
    props.pageNumber,
    props.pageSize,
  );
  if (
    applications.data.length &&
    applications.data?.[0].employerId.toString() !== props.employerId
  ) {
    throw new HttpError({
      statusCode: 403,
      message: "You are not allowed to check the application list of this job",
    });
  }
  return applications;
};

export const getApplicationDetails = async (props: {
  applicationId: string;
  employerId: string;
  jobId: string;
}) => {
  const application = await ApplicationModel.findOne({
    jobId: props.jobId,
    _id: props.applicationId,
  });
  if (!application) {
    throw new HttpError({
      statusCode: 404,
      message: "Application was not found",
    });
  }
  if (application.employerId !== props.employerId) {
    throw new HttpError({
      statusCode: 403,
      message: "You are not allowed to check this application",
    });
  }
  return application;
};

