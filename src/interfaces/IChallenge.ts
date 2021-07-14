export interface IChallenge {
  id: number;
  title: string;
  description: string;
  successDescription: string;
  userMents: [string];
  totalStamp: number;
}