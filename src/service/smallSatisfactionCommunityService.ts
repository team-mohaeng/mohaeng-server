import SmallSatisfaction from "../models/SmallSatisfaction";
import User from "../models/User";
import SmallSatisfactionCommunityResponseDTO, { CommunityResponseDTO } from "../dto/SmallSatisfaction/Community/response/SmallSatisfactionCommunityResponseDTO";

export default {
  community: async (token: String, sort: String) => {
    const user = await User.findOne({ id: token });
    if (!user) {
      console.log("유저가 없어여 ㄷ ㄷ");
      //토큰 다시 들고오삼-
    }
    //user 하나만 만들어보주앙 ㅋㅋ 
    
    let smallSatisfactionWritten;
    let today = new Date();
    let todayYear = today.getFullYear().toString();
    let todayMonth = (today.getMonth() + 1).toString();
    let todayDay = today.getDate().toString();

    let hasSmallSatisfaction = await SmallSatisfaction.findOne({ year: todayYear, month: todayMonth, day: todayDay, user: user._id });
    user.courses.forEach((course) => {
      course.challenges.forEach((challenge) => {
        if ((challenge.situation === 2) && (hasSmallSatisfaction)) { 
          if (hasSmallSatisfaction) {
            smallSatisfactionWritten = true;                               
          }
          else {
            smallSatisfactionWritten = false;
          }
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
      //isPrivate Boolean으로 파싱해줘야함
      let responseSmallSatisfaction: Array<CommunityResponseDTO> = new Array<CommunityResponseDTO>();
      communitySmallSatisfactions.forEach((communitySmallSatisfaction) => {
        let liked;
        if (SmallSatisfaction.find().populate('likes').populate(user)) {
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