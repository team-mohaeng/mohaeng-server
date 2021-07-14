export default interface GetChallengeResponseDTO {
  status: number;
  data: CourseMapResponseDTO;
}

interface CourseMapResponseDTO {
  course: CourseMapDetailResponseDTO;
}

interface CourseMapDetailResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: ChallengeMapDetailResponseDTO[];
}

export interface ChallengeMapDetailResponseDTO {
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