import { mongo } from "mongoose";

export const isDuplicateError = (e: unknown) => e instanceof mongo.MongoServerError && e.code === 11000