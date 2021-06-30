import { IMent } from "./IMent";

export interface IChallenge {
  day: number;
  title: string;
  description: string;
  userMents: [IMent];
  totalCounts: number;
}