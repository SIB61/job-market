import { controller } from "@/utils/controller";
import { requestResponseValidator } from "@/utils/request-response-validator";
import { Request, Response } from "express";

export const handleCreateEmployerRequest = controller(
    async (req: Request, res: Response) => {
        

    },
    requestResponseValidator({
        requestBody: '',
        
    })
)
    
