import mongoose from "mongoose";
import { ICourse } from "../interfaces/ICourse";

const CourseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  property: {
    type: Number,
    required: true,
  },
  challenges: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      successDescription: {
        type: String,
        default: "",
      },
      userMents: {
        type: [String],
        required: true,
      },
      totalStamp: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model<ICourse & mongoose.Document>("Course", CourseSchema);