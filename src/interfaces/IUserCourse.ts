import mongoose from "mongoose";
import { IUserChallenge } from "./IUsrChallenge";

export interface IUserCourse {
  course: mongoose.Types.ObjectId;
  id: number;
  situation: number;
  challenges?: IUserChallenge[];
}