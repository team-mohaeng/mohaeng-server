export interface IUserChallenge {
  id: number;
  situation: number;
  date?: Date;
  year?: string;
  month?: string;
  day?: string;
  currentStamp: number;
}