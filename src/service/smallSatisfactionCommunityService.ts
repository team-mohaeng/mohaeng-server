import SmallSatisfaction from "../models/SmallSatisfaction";
import User from "../models/User";
import { IFail } from "../interfaces/IFail";
import SmallSatisfactionCommunityResponseDTO, { CommunityResponseDTO } from "../dto/SmallSatisfaction/Community/response/SmallSatisfactionCommunityResponseDTO";

export default {
  community: async (token: String, sort: String) => {
    const user = await User.findOne({ id: token });
    if (!user) {
      const notExistUser: IFail = {
        status: 400,
        message: "유저가 존재하지 않습니다.",
      };
      return notExistUser;
    }
    
    let smallSatisfactionWritten;
    let today = new Date();
    let todayYear = today.getFullYear().toString();
    let todayMonth = (today.getMonth() + 1).toString();
    let todayDay = today.getDate().toString();

    let hasSmallSatisfaction = await SmallSatisfaction.findOne({ year: todayYear, month: todayMonth, day: todayDay, user: user._id });
    user.courses.forEach((course) => {
      course.challenges.forEach((challenge) => {
        if ((challenge.situation === 2) && (!hasSmallSatisfaction)) {
          smallSatisfactionWritten = false;                               
        }
        else {
          smallSatisfactionWritten = true;
        }
      });
    });
      
    const userCount = await SmallSatisfaction.findOne({ year: todayYear, month: todayMonth, day: todayDay }).countDocuments();

    let communitySmallSatisfactions;
    if (sort === "date") {
      communitySmallSatisfactions = await SmallSatisfaction.find({ isPrivate: false }).sort({ date: -1 });
    }

    if (sort === "like") {
      communitySmallSatisfactions = await SmallSatisfaction.find({ isPrivate: false }).sort({ likeCount: -1 });
    }

    try{  
      let responseSmallSatisfaction: Array<CommunityResponseDTO> = new Array<CommunityResponseDTO>();
      communitySmallSatisfactions.forEach((communitySmallSatisfaction) => {
        let liked;
        if (communitySmallSatisfaction.likes.filter((like) => like.user.toString() === token)
            .length > 0
        ) {
          liked = true;
        }
        else {
          liked = false;
        }

        const responseDTO: CommunityResponseDTO = {
          postId: communitySmallSatisfaction.postId,
          nickname: user.nickname,
          likeCount: communitySmallSatisfaction.likes.length,
          content: communitySmallSatisfaction.content,
          hasLike: liked,
          hashtags: communitySmallSatisfaction.hashtags,
          year: todayYear,
          month: todayMonth,
          day: todayDay,
          date: communitySmallSatisfaction.date,
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