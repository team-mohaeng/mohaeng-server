import { IChallenge } from "./IChallenge";

export interface ICourse {
  id: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: [IChallenge];
}