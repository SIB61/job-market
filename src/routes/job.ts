import {
  handleCreateJob,
  handleDeleteJob,
  handleGetJobDetails,
  handleJobApplicationDeactivation,
  handleJobSearch,
  handleUpdateJob,
} from "@/controllers/job";
import { authGuard } from "@/guards/auth-guard";
import { Router } from "express";

const jobRouter = Router();

jobRouter.post("/", authGuard(), handleCreateJob);

jobRouter.put("/:jobId", authGuard(), handleUpdateJob);

jobRouter.get("/:jobId", authGuard(), handleGetJobDetails)

jobRouter.delete(
  "/:jobId",
  authGuard(),
  handleDeleteJob
);

jobRouter.post("/search", handleJobSearch)

jobRouter.patch("/:jobId", authGuard(), handleJobApplicationDeactivation)

export default jobRouter;

