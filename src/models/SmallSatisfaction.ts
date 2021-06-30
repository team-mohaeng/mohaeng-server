import mongoose from "mongoose";
import { ISmallSatisfaction } from "../interfaces/ISmallSatisfaction";

const SmallSatisfactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  likes: [
    {
      user: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  content: {
    type: String,
    required: true,
  },
  images: [
    {
      image: {
        type: String,
      },
    },
  ],
  moodImage: {
    type: String,
  },
  moodText: {
    type: String,
  },
  hashtags: [
    {
      hashtag: {
        type: String,
      },
    },
  ],
  isPrivate: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
});

export default mongoose.model<ISmallSatisfaction & mongoose.Document>("SmallSatisfaction", SmallSatisfactionSchema);