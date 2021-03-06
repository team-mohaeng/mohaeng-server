import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import { IMessage } from "../interfaces/IMessage";
import { IUserCourse } from "../interfaces/IUserCourse";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userPw: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  birthYear: {
    type: Number,
    required: true,
  },
  situation: {
    type: Number,
    default: 0,
  },
  affinity: {
    type: Number,
    default: 20,
  },
  success: {
    maxCount: {
      type: Number,
      default: 0,
    },
    currentCount: {
      type: Number,
      default: 0,
    },
    recentDate: {
      type: Date,
    },
  },
  messages: [
    {
      jouneyMessages: [
        {
          message: {
           type: mongoose.Types.ObjectId,
           required: true,
          },
          content: {
           type: String,
           required: true,
          },
          date: {
           type: Date,
           required: true,
          },
        },
      ],
      challengeMessages: [
        {
          message: {
           type: mongoose.Types.ObjectId,
           required: true,
          },
          content: {
           type: String,
           required: true,
          },
          date: {
           type: Date,
           required: true,
          },
        },
      ],
    },
  ],
  courses: [
    {
      course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
      id: {
        type: Number,
        required: true,
      },
      situation: {
        type: Number,
        required: true,
        default: 0,
      },
      challenges: [
        {
          id: {
            type: Number,
            required: true,
          },
          situation: {
            type: Number,
            required: true,
            default: 0,
          },
          date: {
            type: Date,
          },
          year: {
            type: String,
            default: "",
          },
          month: {
            type: String,
            default: "",
          },
          day: {
            type: String,
            default: "",
          },
          currentStamp: {
            type: Number,
            required: true,
            default: 0,
          },
        },
      ],
    },
  ],
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema); 