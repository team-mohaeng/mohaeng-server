import mongoose from "mongoose";
import { IUserChallengeD } from "./IUserChallengeD";

export interface IUserCourseD {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number; // 0: 건강 1: 기억 2: 관찰 3: 도전
  challenges?: IUserChallengeD[];
}