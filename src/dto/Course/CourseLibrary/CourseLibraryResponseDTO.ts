export default interface CourseLibraryResponseDTO {
  status: number;
  data: TotalCourseResponseDTO;
}

export interface TotalCourseResponseDTO {
  courses: CourseResponseDTO[];
}

export interface CourseResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: ChallengeResponseDTO[];
}

export interface ChallengeResponseDTO {
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