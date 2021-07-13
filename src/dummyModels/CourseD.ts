import mongoose from "mongoose";
import { ICourseD } from "../dummyInterfaces/ICourseD";

const CourseSchemaD = new mongoose.Schema({
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

export default mongoose.model<ICourseD & mongoose.Document>("CourseD", CourseSchemaD);