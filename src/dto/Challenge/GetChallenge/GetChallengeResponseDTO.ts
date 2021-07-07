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
  property: string;
  challenges: ChallengeMapDetailResponseDTO[];
}

export interface ChallengeMapDetailResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  year: string;
  month: string;
  day: string;
  currentStamp: number;
  totalStamp: number;
  userMents: String[];
}