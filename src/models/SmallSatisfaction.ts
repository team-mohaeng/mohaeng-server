import mongoose from "mongoose";
import { ISmallSatisfaction } from "../interfaces/ISmallSatisfaction";
import { dateFormatter } from "../formatter/dateFormatter";

const SmallSatisfactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      user: {
       type: mongoose.Types.ObjectId,
       ref: "User",
      },
    },
  ],
  content: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
  },
  subImages: {
    type: [String],
  },
  moodImage: {
    type: String,
  },
  moodText: {
    type: String,
  },
  hashtags: {
      type: [String],
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    default: dateFormatter(),
  },
});

export default mongoose.model<ISmallSatisfaction & mongoose.Document>("SmallSatisfaction", SmallSatisfactionSchema);