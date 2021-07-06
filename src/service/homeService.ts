import HomeResponseDTO, { HomeChallengeResponseDTO, HomeCourseResponseDTO, HomeMentResponseDTO } from "../dto/Home/HomeResponseDTO";
import { IFail } from "../interfaces/IFail";
import Course from "../models/Course";
import User from "../models/User"

export default {
  home: async (token: String) => {
    try {
      let user = await User.findOne({ id: token });

      if (!user) {
        const notExistUser: IFail = {
          status: 404,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser;
      }

      let userCourseArray: Array<HomeCourseResponseDTO> = new Array<HomeCourseResponseDTO>();
      user = await user.populate("course");

      let userChallengeArray: Array<HomeChallengeResponseDTO> = new Array<HomeChallengeResponseDTO>();
      const dummyCourseList = await Course.find();
      user.courses.forEach((course) => {
        const dummyCourse = dummyCourseList[course.id - 1];

        course.challenges.forEach((challenge) => {
          const dummyChallenge = dummyCourse.challenges[challenge.id - 1];
          let ments: Array<String> = new Array<String>();
          dummyChallenge.userMents.forEach((ment) => {
            ments.push(ment.ment);
          });

          userChallengeArray.push({
            id: challenge.id,
            situation: challenge.situation,
            title: dummyChallenge.title,
            description: dummyChallenge.description,
            year: challenge.year,
            month: challenge.month,
            day: challenge.day,
            currentStamp: challenge.currentStamp,
            totalStamp: dummyChallenge.totalStamp,
            userMents: ments
          });
        });
        
        userCourseArray.push({
          id: course.id,
          situation: course.situation,
          title: dummyCourse.title,
          description: dummyCourse.description,
          totalDays: dummyCourse.totalDays,
          property: dummyCourse.property,
          challenges: userChallengeArray
        });
      });

      const responseDTO: HomeResponseDTO = {
        status: 200,
        data: {
          situation: user.situation,
          affinity: user.affinity,
          course: userCourseArray
        }
      };

      return responseDTO;
    } catch (err) {
      console.error(err.message);
    }
  }
}