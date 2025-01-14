import { MongoServerError } from "mongodb";

export const isDuplicateError = (e: unknown) => e instanceof MongoServerError && e.code === 11000