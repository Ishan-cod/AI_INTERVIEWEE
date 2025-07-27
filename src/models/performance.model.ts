import mongoose, { Schema, Document } from "mongoose";

interface PerFeedbackType {
  question: string;
  feedback: string;
  topic: string;
  score: number;
}

export interface PerformanceInterface extends Document {
  overall_score: number;
  hireable: boolean;
  question_feedback: PerFeedbackType[];
  strengths: StrengthType[]; // ← changed from string[]
  action_items: string[];
  concluding_statement: string;
}

interface StrengthType {
  topic: string;
  detail: string;
}

const StrengthSchema: Schema<StrengthType> = new Schema(
  {
    topic: { type: String, required: true },
    detail: { type: String, required: true },
  },
  { _id: false }
);

const PerFeedbackSchema: Schema<PerFeedbackType> = new Schema(
  {
    question: { type: String, required: true },
    feedback: { type: String, required: true },
    topic: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { _id: false }
);

const PerformanceSchema: Schema<PerformanceInterface> = new Schema(
  {
    overall_score: { type: Number, required: true },
    hireable: { type: Boolean, required: true },
    question_feedback: { type: [PerFeedbackSchema], required: true },
    strengths: { type: [StrengthSchema], required: true }, // ← FIXED
    action_items: { type: [String], required: true },
    concluding_statement: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PerformanceModel =
  (mongoose.models.PerformanceModel as mongoose.Model<PerformanceInterface>) ||
  mongoose.model<PerformanceInterface>("PerformanceModel", PerformanceSchema);

export { PerformanceModel };
