import mongoose from "mongoose"

export interface IUserChallenge {
  id: number;
  situation: number;
  date?: Date;
  year?: number;
  month?: number;
  day?: number;
  currentStamp: number;
}