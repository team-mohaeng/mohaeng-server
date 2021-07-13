import mongoose from "mongoose";
import autoincrement from "mongoose-auto-increment";
import { ISmallSatisfactionD } from "../dummyInterfaces/ISmallSatisfactionD";

mongoose.set('useFindAndModify', false);

const SmallSatisfactionSchemaD = new mongoose.Schema({
  user: {
    //_id user object id 값이 들어옴
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  nickname: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  likeCount: {
    type: Number,
    required: true,
    default: 0,
  },
  postId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
  },
  moodImage: {
    type: String,
    required: true,
  },
  moodText: {
    type: String,
    required: true,
  },
  hashtags: {
      type: [String],
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  week: {
    type: String,
    required: true,
  },
});

autoincrement.initialize(mongoose.connection);
SmallSatisfactionSchemaD.plugin(autoincrement.plugin, {
  model: 'smallSatisfaction',
  field: 'postId',
  startAt: 1,
  increment: 1
});

export default mongoose.model<ISmallSatisfactionD & mongoose.Document>("SmallSatisfactionD", SmallSatisfactionSchemaD);