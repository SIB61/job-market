import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cvUrl: { type: String, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true }
})

const applicationModel = mongoose.models['applications'] ?? mongoose.model('applications', ApplicationSchema)

export default applicationModel