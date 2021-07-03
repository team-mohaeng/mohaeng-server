import HomeResponseDTO from "../dto/Home/HomeResponseDTO";
import { IFail } from "../interfaces/IFail";
import { IUserCourse } from "../interfaces/IUserCourse";
import { IUserChallenge } from "../interfaces/IUsrChallenge";
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

      if (user.situation != 0) {
        let userCourse: IUserCourse;
        let userChallenge: IUserChallenge;

        user.courses.forEach((course) => {
          if (course.situation == 1) {
            userCourse = course;
          }
        });

        userCourse.challenges.forEach((challenge) => {
          if (challenge.situation === 1) {
            userChallenge = challenge;
          }
        });

        const progressCourse = await Course.findOne({ id: userCourse.id });
        console.log(progressCourse);

        const responseDTO: HomeResponseDTO = {
          status: 200,
          data: {
            situation: user.situation,
            affinity: user.affinity,
            course: {
              title: progressCourse.title,
              property: progressCourse.property,
            },
            challenge: {
              day: userChallenge.day,
            },
          },
        };

        return responseDTO;
      }

      const responseDTO: HomeResponseDTO = {
        status: 200,
        data: {
          situation: user.situation,
          affinity: user.affinity,
        },
      };

      return responseDTO;
    } catch (err) {
      console.error(err.message);
    }
  }
}