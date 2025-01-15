import mongoose, { mongo } from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

JobSchema.index({ title: "text" });

const JobModel = mongoose.models["jobs"] ?? mongoose.model("jobs", JobSchema);

export default JobModel;

