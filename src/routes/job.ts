import {
  handleCreateJob,
  handleDeleteJob,
  handleUpdateJob,
} from "@/controllers/job";
import { controller } from "@/utils/controller";
import { Router } from "express";

const jobRouter = Router();

jobRouter.get("/");

jobRouter.post("/", controller(handleCreateJob, { authenticated: true }));

jobRouter.put("/:jobId", controller(handleUpdateJob, { authenticated: true }));

jobRouter.delete(
  "/:jobId",
  controller(handleDeleteJob, { authenticated: true }),
);

export default jobRouter;

