import mongoose from "mongoose";
import { IUserD } from "../dummyInterfaces/IUserD";
import { IMessageD } from "../dummyInterfaces/IMessageD";
import { IUserCourseD } from "../dummyInterfaces/IUserCourseD";

const UserSchemaD = new mongoose.Schema({
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
          title: {
           type: String,
           required: true,
          },
          body: {
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
          title: {
            type: String,
            required: true,
           },
           body: {
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
      },
      situation: {
        type: Number,
        required: true,
        default: 0,
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
          situation: {
            type: Number,
            required: true,
            default: 0,
          },
          description: {
            type: String,
            required: true,
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
          totalStamp: {
            type: Number,
            required: true,
          },
          userMents: {
            type: [String],
            required: true,
          },
        },
      ],
    },
  ],
});

export default mongoose.model<IUserD & mongoose.Document>("UserD", UserSchemaD); 