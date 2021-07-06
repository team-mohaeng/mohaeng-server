import { IMent } from "./IMent";

export interface IChallenge {
  id: number;
  title: string;
  description: string;
  userMents: [IMent];
  totalStamp: number;
}