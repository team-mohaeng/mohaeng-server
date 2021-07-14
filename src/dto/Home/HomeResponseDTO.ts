import { IMent } from "../../interfaces/IMent";

export default interface HomeResponseDTO {
  status: number;
  data: HomeUserResponseDTO;
}

interface HomeUserResponseDTO {
  situation: number;
  affinity: number;
  course?: HomeCourseResponseDTO;
}

export interface HomeCourseResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: number;
  challenges: HomeChallengeResponseDTO[];
}

export interface HomeChallengeResponseDTO {
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