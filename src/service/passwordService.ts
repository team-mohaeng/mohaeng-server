import { ISuccess } from "../interfaces/ISuccess";
import { IFail } from "../interfaces/IFail";
import User from "../models/User";

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

      const response: ISuccess = {
        status: 200,
        message: "유저가 존재합니다.",
      };
      return response;
    } catch (err) {
      console.error(err.message);
    }
  }
}