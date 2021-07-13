import mongoose from "mongoose";
import { IUserChallenge } from "./IUsrChallenge";

export interface IUserCourse {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number; // 0: 건강 1: 기억 2: 관찰 3: 도전
  challenges?: IUserChallenge[];
}