import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import { IMessage } from "../interfaces/IMessage";
import { IUserCourse } from "../interfaces/IUserCourse";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
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
  affinity: {
    type: Number,
    required: true,
    default: 0,
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
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      situation: {
        type: Number,
        required: true,
        default: 0,
      },
      challenges: [
        {
          day: {
            type: Number,
            required: true,
            unique: true,
          },
          situation: {
            type: Number,
            required: true,
            default: 0,
          },
          date: {
            type: Date,
          },
          currentCounts: {
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