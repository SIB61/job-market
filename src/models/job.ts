import mongoose, { mongo } from "mongoose";
import { string } from "zod";

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
    type: String,
    required: true,
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const JobModel = mongoose.models["jobs"] ?? mongoose.model("jobs", JobSchema);

export default JobModel;

