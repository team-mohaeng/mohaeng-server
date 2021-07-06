import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

import User from "../models/User";
import { IFail } from "../interfaces/IFail";
import UserSignUpRequestDTO from "../dto/SignUp/UserSignUpRequestDTO";
import UserSignUpResponseDTO from "../dto/SignUp/UserSignUpResponseDTO";
import Course from "../models/Course";
import { IUserCourse } from "../interfaces/IUserCourse";
import { IUserChallenge } from "../interfaces/IUsrChallenge";

export default {
  signup: async (dto: UserSignUpRequestDTO) => {
    try {
      const { userId, userPw, nickname, gender, birthYear } = dto;

      let user = await User.findOne({ userId });
      if (user) {
        const duplicateId: IFail = {
          status: 400,
          message: "이미 사용 중인 이메일입니다.",
        };
        return duplicateId;
      }

      user = await User.findOne({ nickname });
      if (user) {
        const duplicateNickname: IFail = {
          status: 400,
          message: "이미 사용 중인 닉네임입니다",
        };
        return duplicateNickname;
      }

      user = new User({
        userId,
        userPw,
        nickname,
        gender,
        birthYear
      });

      const courses = await Course.find({});
      let userCourse: Array<IUserCourse> = new Array<IUserCourse>();

      courses.forEach((course) => {
        let userChallenge: Array<IUserChallenge> = new Array<IUserChallenge>();

        course.challenges.forEach((challenge) => {
          userChallenge.push(
            {
              day: challenge.day,
              situation: 0,
              currentCounts: 0
            }
          );
        });

        userCourse.push(
          {
            id: course.id,
            situation: 0,
            challenges: userChallenge
          }
        );
      });
      user.courses = userCourse;

      const salt = await bcrypt.genSalt(10);
      user.userPw = await bcrypt.hash(userPw, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      const jwtToken = jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 36000 },
      );

      const responseDTO: UserSignUpResponseDTO = {
        status: 200,
        data: {
          jwt: jwtToken,
        },
      };

      return responseDTO;
    } catch (err) {
      console.error(err.message);
    }
  }
}