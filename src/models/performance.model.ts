import mongoose, { Schema, Document } from "mongoose";

 export interface performance_interface extends Document {
  score: number;
  review: string;
  strength_area: [string];
}

const performance_schema: Schema<performance_interface> = new Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    strength_area: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const performance_model =
  (mongoose.models.Performance_model as mongoose.Model<performance_interface>) ||
  mongoose.model<performance_interface>("Performance_model", performance_schema);

export { performance_model };
