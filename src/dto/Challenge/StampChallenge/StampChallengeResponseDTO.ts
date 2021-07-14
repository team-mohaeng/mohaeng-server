export default interface StampChallengeResponseDTO {
  status: number;
  data: StampCourseResponseDTO;
}

export interface StampCourseResponseDTO {
  course: StampCourseDetailResponseDTO;
}

export interface StampCourseDetailResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: StampChallengeDetailResponseDTO[];
}

export interface StampChallengeDetailResponseDTO {
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