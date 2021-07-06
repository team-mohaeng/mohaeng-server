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
    type: String,
    required: true,
  },
  challenges: [
    {
      id: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      userMents: [
        {
          ment: {
            type: String,
            required: true,
          },
        },
      ],
      totalStamp: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model<ICourse & mongoose.Document>("Course", CourseSchema);