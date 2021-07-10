import SmallSatisfaction from "../models/SmallSatisfaction";
import User from "../models/User";
import { IFail } from "../interfaces/IFail";
import SmallSatisfactionDetailResponseDTO from "../dto/SmallSatisfaction/Detail/response/SmallSatisfactionDetailResponseDTO";

export default {
  myDrawer: async (token: String, postId: string) => {
    let postNumber = parseInt(postId);
    const user = await User.findOne({ id: token });
    if (!user) {
      const notExistUser: IFail = {
        status: 400,
        message: "유저가 존재하지 않습니다.",
      };
      return notExistUser;
    }

    try {
      let detailSmallSatisfaction = await SmallSatisfaction.findOne({ postId: postNumber });
      let liked;
      if (detailSmallSatisfaction.likes.filter((like) => like.user.toString() === token)
          .length > 0
      ) {
        liked = true;
      }
      else {
        liked = false;
      }
  
      let smallSatisfactionUser = await User.findOne({ _id: detailSmallSatisfaction.user });
      let userNickname = smallSatisfactionUser.nickname;
    
      const responseDTO: SmallSatisfactionDetailResponseDTO = {
        status: 200,
        data: {
          postId: detailSmallSatisfaction.postId,
          nickname: userNickname,
          moodImage: detailSmallSatisfaction.moodImage,
          mainImage: detailSmallSatisfaction.mainImage,
          likeCount: detailSmallSatisfaction.likes.length,
          content: detailSmallSatisfaction.content,
          hasLike: liked,
          hashtags: detailSmallSatisfaction.hashtags,
          year: detailSmallSatisfaction.year,
          month: detailSmallSatisfaction.month,
          day: detailSmallSatisfaction.day,
          date: detailSmallSatisfaction.date
        }
      }
  
      return responseDTO; 
    } catch (err) {
    console.error(err.message);
    }
  }
}