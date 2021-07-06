import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

import User from "../models/User";
import { IFail } from "../interfaces/IFail";
import UserSignInRequestDTO from "../dto/SignIn/UserSignInRequestDTO";
import UserSignInResponseDTO from "../dto/SignIn/UserSignInResponseDTO";

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
        { expiresIn: 36000 },
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
    }
  }
}