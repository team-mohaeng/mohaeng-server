export default interface HomeResponseDTO {
  status: number;
  data: HomeUserResponseDTO;
}

interface HomeUserResponseDTO {
  situation: number;
  affinity: number;
  course?: HomeCourseResponseDTO;
  challenge?: HomeChallengeResponseDTO;
}

interface HomeCourseResponseDTO {
  title: string;
  property: string;
}

interface HomeChallengeResponseDTO {
  day: number;
}