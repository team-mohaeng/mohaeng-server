import mongoose from "mongoose"

export interface IUserChallenge {
  day: number;
  situation: number;
  date?: Date;
  currentCounts: number;
}