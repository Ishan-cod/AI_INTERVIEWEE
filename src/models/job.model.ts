import mongoose, { Schema, Document } from "mongoose";

export interface job_interface extends Document {
  job_title: string;
  location: string;
  country: string;
  salary: number;
  skills_required: Array<string>;
  company_name: string;
  experience_required: string;
  job_description: string;
  created_at: Date;
}

const job_schema: Schema<job_interface> = new Schema({
  job_title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    default: "India",
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    trim: true,
  },
  skills_required: {
    type: [String],
  },
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
  experience_required: {
    type: String,
    default: "Freshers",
    trim: true,
  },
  job_description: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const job_model =
  (mongoose.models.Job_model as mongoose.Model<job_interface>) ||
  mongoose.model<job_interface>("Job_model", job_schema);

export { job_model };
