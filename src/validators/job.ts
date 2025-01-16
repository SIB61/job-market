import requestValidator from "@/utils/request-validator";
import { z } from "zod";

export const validateJobCreateRequest = requestValidator({
    body:
        z.object({
            title: z.string(),
            description: z.string(),
            salary: z.object({
                max: z.number().positive(),
                min: z.number().positive()
            }),
            location: z.string()
        }),
})


export const validateJobUpdateRequest = requestValidator({
    body: z.object({
        title: z.string(),
        description: z.string(),
        salary: z.object({
            max: z.number().positive(),
            min: z.number().positive()
        }),
        location: z.string()
    }),
})

export const validateJobSearchRequest = requestValidator({
    body: z.object({
        maxSalary: z.number().positive().optional(),
        minSalary: z.number().positive().optional(),
        title: z.string().optional(),
        location: z.string().optional(),
        pageNumber: z.number().positive().default(1),
        pageSize: z.number().positive().default(Number.MAX_SAFE_INTEGER)
    })
})

export const validateJobActivationRequest = requestValidator({
    body: z.object({
        isActive: z.boolean()
    }),
})
