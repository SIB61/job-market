import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const zObjectId = z.string().refine(isValidObjectId, "Please provide a valid object id")

export const zPassword = z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })