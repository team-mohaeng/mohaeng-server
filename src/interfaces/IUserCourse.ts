import mongoose from "mongoose";
import { IUserChallenge } from "./IUsrChallenge";

export interface IUserCourse {
  id: number;
  situation: number;
  challenges?: [IUserChallenge];
}