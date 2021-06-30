export interface ICourse {
  id: number;
  title: string;
  description: string;
  totalDays: number;
  property: string;
  challenges: [IChallenge];
}