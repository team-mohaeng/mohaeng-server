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
  property: string;
  challenges: StampChallengeDetailResponseDTO[];
}

export interface StampChallengeDetailResponseDTO {
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