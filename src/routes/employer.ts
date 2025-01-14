import { Router } from "express";
import { handleCreateEmployerRequest } from "../controllers/employer";
import { controller } from "@/utils/controller";

const employerRouter = Router()

employerRouter.post('/', controller(handleCreateEmployerRequest))

export default employerRouter
