import { z } from "zod";

const responseValidator = (schema: z.Schema) => (result: any) => {
    return schema.parse(result)
}

export default responseValidator