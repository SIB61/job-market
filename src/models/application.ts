import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    cvUrl: { type: String, required: true },
    coverLetterUrl: { type: String },
    jobId: { type: String, required: true },
    employerId: { type: String, required: true },
}, {
    timestamps: true
})

const ApplicationModel = mongoose.models['applications'] ?? mongoose.model('applications', ApplicationSchema)

export default ApplicationModel