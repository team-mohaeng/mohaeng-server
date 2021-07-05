export default interface CourseLibraryResponseDTO {
  status: number;
  data: TotalCourseResponseDTO;
}

export interface TotalCourseResponseDTO {
  course: CourseResponseDTO[];
}

export interface CourseResponseDTO {
  id: number;
  situation: number;
  title: string;
  description: string;
  totalDays: number;
  property: string;
}