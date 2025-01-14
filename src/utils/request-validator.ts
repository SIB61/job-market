import { Request } from "express";
import { z, ZodError } from 'zod'
import { HttpError } from "./http-error";
import ApiResponseType from "@/enums/api-response-type";

const requestValidator = ({
    body,
    query
}: { body?: z.Schema, query?: z.Schema }) => {
    return (req: Request) => {
        try {
            if (body) {
                req.body = body.parse(req.body)
            }
            if (query) {
                req.query = query.parse(req.query)
            }
        } catch (e) {
            if (e instanceof ZodError) {
                throw new HttpError({ statusCode: 400, message: e.issues[0].message, error: e })
            }
            throw e
        }
    }
}

export default requestValidator