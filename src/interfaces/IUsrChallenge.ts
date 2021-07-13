export interface IUserChallenge {
  id: number;
  title: string;
  situation: number;
  description: string;
  date?: Date;
  year?: string;
  month?: string;
  day?: string;
  currentStamp: number;
  totalStamp: number;
  userMents: [string];
}