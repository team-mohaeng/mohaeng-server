import { IChallenge } from "../interfaces/IChallenge";

export interface ICourseD {
  id: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: [IChallenge];
}