import { ISuccess } from "../interfaces/ISuccess";
import { IFail } from "../interfaces/IFail";
import User from "../models/User";
import password from "../controller/password";
import CheckEmailResponseDTO from "../dto/Password/CheckEmailResponseDTO";

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
    }
  }
}