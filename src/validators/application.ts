import requestValidator from "@/utils/request-validator";
import { z } from "zod";

export const validateJobApplyRequest = requestValidator({
    body: z.object({
        name: z.string().min(3),
        email: z.string().email(),
        cvUrl: z.string().url(),
        coverLetterUrl: z.string().url().optional()
    }),
})

export const validateGetApplicationListRequest = requestValidator({
    query: z.object({
        page_number: z.number().default(1),
        page_size: z.number().default(Number.MAX_SAFE_INTEGER),
    }),
})
