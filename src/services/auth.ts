import EmployerModel from "@/models/employer";
import { Employer } from "@/types/employer";
import { isDuplicateError } from "@/utils/error";
import { HttpError } from "@/utils/http-error";
import { compareSync, hashSync } from 'bcrypt'
import { sign } from "jsonwebtoken";

export const registerEmployer = async (employer: Employer) => {
    employer.password = hashSync(employer.password, 10)
    try {
        await EmployerModel.create(employer)
    } catch (e) {
        if (isDuplicateError(e)) {
            throw new HttpError({
                statusCode: 409,
                message: "This email is already registered."
            })
        }
        throw e
    }
}


export const loginEmployer = async ({ email, password }: { email: string, password: string }) => {
    const employer = await EmployerModel.findOne({ email }).select('name email password')
    if (!employer) {
        throw new HttpError({ statusCode: 404, message: 'Incorrect username or password' })
    }
    const isValidPassword = compareSync(password, employer.password)
    if (!isValidPassword) {
        throw new HttpError({ statusCode: 404, message: 'Incorrect username or password' })
    }

    const accessToken = sign({ id: employer._id, email: employer.email }, process.env.JWT_SECRET!!, { expiresIn: '6h' })
    const refreshToken = sign({ id: employer._id }, process.env.JWT_SECRET!!, { expiresIn: '10d' })

    return { accessToken, refreshToken }
}
