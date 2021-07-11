import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

import { IFail } from "../interfaces/IFail";
import User from "../models/User";
import password from "../controller/password";
import CheckEmailResponseDTO from "../dto/Password/CheckEmailResponseDTO";
import ChangePasswordRequestDTO from "../dto/Password/ChangePasswordRequestDTO";
import ChangePasswordResponseDTO from "../dto/Password/ChangePasswordResponseDTO";
import { SERVER_ERROR_MESSAGE } from "../constant";

export default {
  user: async (id: string) => {
    try {
      const user = await User.findOne({ userId: id });

      if (!user) {
        const notExistUser: IFail = {
          status: 404,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser;
      }

      const number = await password.email(id);

      if (!number) {
        const notValidationEmail: IFail = {
          status: 400,
          message: "유효하지 않은 이메일입니다."
        }
        return notValidationEmail;
      }

      const response: CheckEmailResponseDTO = {
        status: 200,
        data: {
          number: number,
        }
      };

      return response;
    } catch (err) {
      console.error(err.message);
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  },
  change: async (dto: ChangePasswordRequestDTO) => {
    try {
      const { userId, userPw } = dto;

      const user = await User.findOne({ userId });
      if (!user) {
        const notExistUser: IFail = {
          status: 404,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser;
      }

      user.userPw = userPw;

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
      );

      const responseDTO: ChangePasswordResponseDTO = {
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