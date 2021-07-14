export default interface TodayChallengeResponseDTO {
  status: number;
  data: CourseResponseDTO;
}

interface CourseResponseDTO {
  course: TodayChallengeCourseRepsonseDTO;
}

interface TodayChallengeCourseRepsonseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: TodayChallengeDetailResponseDTO[];
}

export interface TodayChallengeDetailResponseDTO {
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