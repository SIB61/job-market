import mongoose, { mongo } from "mongoose";

const EmployerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required in Employer schema']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required in Employer schema']
    },
    password: {
        type: String,
        required: [true, 'Password is required in Employer schema']
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const EmployerModel = mongoose.models['employers'] ?? mongoose.model('employers', EmployerSchema)

export default EmployerModel