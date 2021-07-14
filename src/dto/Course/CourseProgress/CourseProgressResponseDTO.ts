export default interface CourseProgressResponseDTO {
  status: number;
  data: CourseResponseDTO;
}

export interface CourseResponseDTO {
  course: CourseDetailProgressRepsonseDTO;
}

export interface CourseDetailProgressRepsonseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: ChallengeDetailProgressResponseDTO[];
}

export interface ChallengeDetailProgressResponseDTO {
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