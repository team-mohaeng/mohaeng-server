import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

import User from "../models/User";
import { IFail } from "../interfaces/IFail";
import UserSignUpRequestDTO from "../dto/signUp/UserSignUpRequestDTO";
import UserSignUpResponseDTO from "../dto/signUp/UserSignUpResponseDTO";

export default {
  signup: async (dto: UserSignUpRequestDTO) => {
    try {
      const { userId, userPw, nickname, gender, birthYear } = dto;

      let user = await User.findOne({ userId });
      if (user) {
        const duplicateId: IFail = {
          status: 400,
          message: "이미 사용 중인 아이디입니다.",
        };
        return duplicateId;
      }

      user = await User.findOne({ nickname });
      if (user) {
        const duplicateNickname: IFail = {
          status: 400,
          message: "이미 사용 중인 닉네임입니다.",
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