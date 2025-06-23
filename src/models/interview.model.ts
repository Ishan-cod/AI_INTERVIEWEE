import mongoose, { Schema, Document } from "mongoose";
import { performance_interface } from "./performance.model";
import { job_interface } from "./job.model";

export interface interview_interface extends Document {
  job_applied: mongoose.Types.ObjectId | job_interface;
  performance: mongoose.Types.ObjectId | performance_interface;
}

const interview_schema: Schema<interview_interface> = new Schema(
  {
    job_applied: {
      type: mongoose.Types.ObjectId,
      ref: "Job_model",
    },
    performance: {
      type: mongoose.Types.ObjectId,
      ref: "Performance_model",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const interview_model =
  (mongoose.models.Interview_model as mongoose.Model<interview_interface>) ||
  mongoose.model<interview_interface>("Interview_model", interview_schema);

export { interview_model };
