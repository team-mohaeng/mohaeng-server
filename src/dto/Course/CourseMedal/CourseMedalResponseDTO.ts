export default interface CourseMedalResponseDTO {
  status: number;
  data: TotalMedalCourseResponseDTO;
}

export interface TotalMedalCourseResponseDTO {
  totalIncreasedAffinity: number;
  maxSuccessCount: number;
  courses: MedalCourseResponseDTO[];
}

export interface MedalCourseResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: MedalChallengeResponseDTO[];
}

export interface MedalChallengeResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  successDescription: string;
  year: string;
  month: string;
  day: string;
  currentStamp: number;
  totalStamp: number;
  userMents: String[];
}