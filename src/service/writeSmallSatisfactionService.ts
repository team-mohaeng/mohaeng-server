import SmallSatisfaction from "../models/SmallSatisfaction"
import User from "../models/User";
import { SmallSatisfactionWriteRequestDTO } from "../dto/SmallSatisfaction/Write/request/SmallSatisfactionWriteDTO"
import { SmallSatisfactionWriteResponseDTO } from "../dto/SmallSatisfaction/Write/response/SmallSatisfactionWriteDTO"
import { IFail } from "../interfaces/IFail";

export default {
  writeSmallSatisfaction: async (token: String, dto: SmallSatisfactionWriteRequestDTO) => {
    let today = new Date();
    let todayYear = today.getFullYear().toString();
    let todayMonth = (today.getMonth() + 1).toString();
    let todayDay = today.getDate().toString();
    let smallSatisfactionCount = await SmallSatisfaction.countDocuments();

    const user = await User.findOne({ id: token });

    if (!user) {
      const notExistUser: IFail = {
        status: 400,
        message: "유저가 존재하지 않습니다.",
      };
      return notExistUser
    }
    
    try{
      const {       
        content,
        moodText,
        moodImage,
        mainImage,
        hashtags,
        isPrivate, } = dto;
          
      let smallSatisfaction = new SmallSatisfaction({
        user: user._id,
        content,
        moodText,
        moodImage,
        mainImage,
        hashtags,
        isPrivate, 
        year: todayYear,
        month: todayMonth,
        day: todayDay,
        postId: smallSatisfactionCount,
        likeCount: 0,
      });
      
      await smallSatisfaction.save();

      const responseDTO: SmallSatisfactionWriteResponseDTO = {
        status: 200,
        data: {
          image : mainImage,
        }
      };

      return responseDTO;
    }
    catch (err) {
      console.error(err.message);
    }
  }
}