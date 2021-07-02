import mongoose from "mongoose"

export interface IUserChallenge {
  challenge: mongoose.Types.ObjectId;
  day: number;
  situation: number;
  date?: Date;
  currentCounts: number;
}