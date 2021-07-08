import SmallSatisfaction from "../models/SmallSatisfaction";
import User from "../models/User";
import { IFail } from "../interfaces/IFail";
import SmallSatisfactionMyDrawerRequestDTO from "../dto/SmallSatisfaction/MyDrawer/request/SmallSatisfactionMyDrawerRequestDTO";
import SmallSatisfactionMyDrawerResponseDTO from "../dto/SmallSatisfaction/MyDrawer/response/SmallSatisfactionMyDrawerResponseDTO";
import SmallSatisfactionResponseDTO from "../dto/SmallSatisfaction/MyDrawer/response/SmallSatisfactionMyDrawerResponseDTO";

export default {
  myDrawer: async (token: String, dto: SmallSatisfactionMyDrawerRequestDTO) => {
    const user = await User.findOne({ id: token });
    if (!user) {
      const notExistUser: IFail = {
        status: 400,
        message: "유저가 존재하지 않습니다.",
      };
      return notExistUser;
    }

    let myDrawerSmallSatisfactions = await SmallSatisfaction.find({ user: user._id, isPrivate: true }).sort({ date: -1 });

    try{  
      let responseSmallSatisfaction: Array<SmallSatisfactionResponseDTO> = new Array<SmallSatisfactionResponseDTO>();
      myDrawerSmallSatisfactions.forEach((myDrawerSmallSatisfaction) => {
        let liked;
        if (myDrawerSmallSatisfaction.likes.filter((like) => like.user.toString() === token)
            .length > 0
        ) {
          liked = true;
        }
        else {
          liked = false;
        }

        const responseDTO: SmallSatisfactionResponseDTO = {
          postId: myDrawerSmallSatisfaction.postId,
          nickname: user.nickname,
          likeCount: myDrawerSmallSatisfaction.likes.length,
          content: myDrawerSmallSatisfaction.content,
          hasLike: liked,
          hashtags: myDrawerSmallSatisfaction.hashtags,
          year: myDrawerSmallSatisfaction.year,
          month: myDrawerSmallSatisfaction.month,
          day: myDrawerSmallSatisfaction.day,
          date: myDrawerSmallSatisfaction.date,
        }
        
        responseSmallSatisfaction.push(responseDTO);
      });
    
      const responseDTO: SmallSatisfactionCommunityResponseDTO = {
        status: 200,
        data: {
          hasSmallSatisfaction: smallSatisfactionWritten,
          userCount: userCount,
          smallSatisfactions: responseSmallSatisfaction,
        }
      };
      return responseDTO;

    } catch (err) {
      console.error(err.message);
    }
  }
}