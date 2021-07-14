import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

import User from "../models/User";
import Course from "../models/Course";
import { IUserCourse } from "../interfaces/IUserCourse";
import { IUserChallenge } from "../interfaces/IUsrChallenge";
import { IFail } from "../interfaces/IFail";
import UserSignInRequestDTO from "../dto/SignIn/UserSignInRequestDTO";
import UserSignInResponseDTO from "../dto/SignIn/UserSignInResponseDTO";
import { SERVER_ERROR_MESSAGE } from "../constant";

export default {
  signin: async (dto: UserSignInRequestDTO) => {
    try {
      const { userId, userPw, userToken } = dto;

      let user = await User.findOne({ userId });
      
      if (!user) {
        const notExistUser: IFail = {
          status: 404,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser;
      }

      const isMatch = await bcrypt.compare(userPw, user.userPw);
      if (!isMatch) {
        const notMatchPw: IFail = {
          status: 400,
          message: "비밀번호가 일치하지 않습니다.",
        };
        return notMatchPw;
      }

      // const courses = await Course.find({});
      // let userCourse: Array<IUserCourse> = new Array<IUserCourse>();

      // courses.forEach((course) => {
      //   let userChallenge: Array<IUserChallenge> = new Array<IUserChallenge>();

      //   course.challenges.forEach((challenge) => {
      //     userChallenge.push(
      //       {
      //         id: challenge.id,
      //         situation: 0,
      //         currentStamp: 0
      //       }
      //     );
      //   });

      //   userCourse.push(
      //     {
      //       course: course._id,
      //       id: course.id,
      //       situation: 0,
      //       challenges: userChallenge
      //     }
      //   );
      // });
      // user.courses = userCourse;

      user.id = userToken;
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      
      const jwtToken = jwt.sign(
        payload,
        config.jwtSecret,
      );

      const responseDTO: UserSignInResponseDTO = {
        status: 200,
        data: {
          jwt: jwtToken,
        },
      };
      
      return responseDTO;
    } catch (err) {
      console.error(err.message);
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  }
}