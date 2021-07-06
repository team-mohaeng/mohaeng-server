import CourseLibraryResponseDTO, { ChallengeResponseDTO, CourseResponseDTO, TotalCourseResponseDTO } from "../dto/Course/CourseLibrary/CourseLibraryResponseDTO";
import { IFail } from "../interfaces/IFail";
import { IUserCourse } from "../interfaces/IUserCourse";
import Course from "../models/Course";
import User from "../models/User";

export default {
  library: async (token: String) => {
    try {
      let user = await User.findOne({ id: token });
      let courses = await Course.find({});
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

      let courseLibraryArray: Array<CourseResponseDTO> = new Array<CourseResponseDTO>();
      courses.forEach((course) => {
        let challengeLibraryArray: Array<ChallengeResponseDTO> = new Array<ChallengeResponseDTO>();
        const userCourse = user.courses[course.id - 1];

        course.challenges.forEach((challenge) => {
          const userChallenge = userCourse.challenges[challenge.id - 1];
          let ments: Array<String> = new Array<String>();
          challenge.userMents.forEach((ment) => {
            ments.push(ment.ment);
          });

          challengeLibraryArray.push({
            id: challenge.id,
            situation: userChallenge.situation,
            title: challenge.title,
            description: challenge.description,
            year: userChallenge.year,
            month: userChallenge.month,
            day: userChallenge.day,
            currentStamp: userChallenge.currentStamp,
            totalStamp: challenge.totalStamp,
            userMents: ments
          });
        });

        courseLibraryArray.push({
          id: course.id,
          situation: userCourse.situation,
          title: course.title,
          description: course.description,
          totalDays: course.totalDays,
          property: course.property,
          challenges: challengeLibraryArray
        });
      });
      courseLibraryArray = courseLibraryArray.sort((a, b) => (a.situation > b.situation)? -1: Number(a.situation > b.situation));

      const responseDTO: CourseLibraryResponseDTO = {
        status: 200,
        data: {
          courses: courseLibraryArray
        }
      };

      return responseDTO;
    } catch (err) {
      console.error(err.message);
    }
  }
}