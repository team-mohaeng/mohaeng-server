import CourseLibraryResponseDTO, { CourseResponseDTO, TotalCourseResponseDTO } from "../dto/Course/CourseLibrary/CourseLibraryResponseDTO";
import { IFail } from "../interfaces/IFail";
import { IUserCourse } from "../interfaces/IUserCourse";
import Course from "../models/Course";
import User from "../models/User";

export default {
  library: async (token: String) => {
    try {
      let user = await User.findOne({ id: token });
      let courses = await Course.find({}, {"_id": 0, "challenges": 0, "__v": 0});
      let progressCourseId: Number;

      if (!user) {
        const notExistUser: IFail = {
          status: 400,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser
      }

      user.courses.forEach((course) => {
        if (course.situation == 1) progressCourseId = course.situation;
      })
      courses = courses.filter((course) => course.id != progressCourseId);

      let responseCourse: Array<CourseResponseDTO> = new Array<CourseResponseDTO>();

      courses.forEach((course) => {
        const responseDTO: CourseResponseDTO = {
          id: course.id,
          situation: 0, // 수정 필요함
          title: course.title,
          description: course.description,
          totalDays: course.totalDays,
          property: course.property
        };
        responseCourse.push(responseDTO);
      });
      responseCourse = responseCourse.sort((a, b) => (a.situation > b.situation)? -1: Number(a.situation > b.situation));

      const responseDTO: CourseLibraryResponseDTO = {
        status: 200,
        data: {
          course: responseCourse,
        }
      };

      return responseDTO;
    } catch (err) {
      console.error(err.message);
    }
  }
}