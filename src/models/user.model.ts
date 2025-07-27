import mongoose, { Schema, Document } from "mongoose";
import { interview_interface } from "./interview.model";

export interface user_interface extends Document {
  name: string;
  email: string;
  password: string;
  interview_given: Array<mongoose.Types.ObjectId | interview_interface>;
  refresh_token: string;
  refresh_token_expiry: Date;
}

const user_schema: Schema<user_interface> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    interview_given: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Interview_model",
      },
    ],
    refresh_token: {
      type: String,
    },
    refresh_token_expiry: {
      type: Date,
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

const UserModel =
  (mongoose.models.User as mongoose.Model<user_interface>) ||
  mongoose.model<user_interface>("User", user_schema);

export { UserModel };
