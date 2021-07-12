import SmallSatisfaction from "../models/SmallSatisfaction"
import User from "../models/User";
import { SmallSatisfactionWriteRequestDTO } from "../dto/SmallSatisfaction/Write/request/SmallSatisfactionWriteDTO"
import { SmallSatisfactionWriteResponseDTO } from "../dto/SmallSatisfaction/Write/response/SmallSatisfactionWriteDTO"
import SmallSatisfactionMyDrawerResponseDTO, { myDrawerResponseDTO } from "../dto/SmallSatisfaction/MyDrawer/response/SmallSatisfactionMyDrawerResponseDTO";
import SmallSatisfactionCommunityResponseDTO, { CommunityResponseDTO } from "../dto/SmallSatisfaction/Community/response/SmallSatisfactionCommunityResponseDTO";
import SmallSatisfactionDetailResponseDTO from "../dto/SmallSatisfaction/Detail/response/SmallSatisfactionDetailResponseDTO";
import { LikeResponseDTO } from "../dto/SmallSatisfaction/Like/response/LikeResponseDTO";
import { DeleteResponseDTO } from "../dto/SmallSatisfaction/Delete/response/DeleteResponseDTO";
import { IFail } from "../interfaces/IFail";
import { SERVER_ERROR_MESSAGE } from "../constant";



export default {
  write: async (token: String, dto: SmallSatisfactionWriteRequestDTO) => {
    let today = new Date();
    let todayYear = today.getFullYear().toString();
    let todayMonth = (today.getMonth() + 1).toString();
    let todayDay = today.getDate().toString();
    let smallSatisfactionCount = await SmallSatisfaction.countDocuments();

    const user = await User.findOne({ id: token });

    if (!user) {
      const notExistUser: IFail = {
        status: 404,
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

      if (content == "") {
        const notExistContent: IFail = {
          status: 400,
          message: "소확행 내용을 작성해주세요.",
        };
        return notExistContent;
      }
          
      let smallSatisfaction = new SmallSatisfaction({
        user: user._id,
        nickname: user.nickname,
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
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  },
  
  myDrawer: async (token: String, year: string, month: string) => {
    const user = await User.findOne({ id: token });
    if (!user) {
      const notExistUser: IFail = {
        status: 404,
        message: "유저가 존재하지 않습니다.",
      };
      return notExistUser;
    }

    try{
      let myDrawerSmallSatisfactions = await SmallSatisfaction.find({ user: user._id, year: year, month: month }, {}, {}).sort({ date: -1 });
      let myDrawers: Array<myDrawerResponseDTO> =  new Array<myDrawerResponseDTO>();
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


      const responseDTO: myDrawerResponseDTO = {
        postId: myDrawerSmallSatisfaction.postId,
        nickname: user.nickname,
        moodImage: myDrawerSmallSatisfaction.moodImage,
        mainImage: myDrawerSmallSatisfaction.mainImage,
        likeCount: myDrawerSmallSatisfaction.likes.length,
        content: myDrawerSmallSatisfaction.content,
        hasLike: liked,
        hashtags: myDrawerSmallSatisfaction.hashtags,
        year: myDrawerSmallSatisfaction.year,
        month: myDrawerSmallSatisfaction.month,
        day: myDrawerSmallSatisfaction.day,
      }
      myDrawers.push(responseDTO);
    });

    const responseDTO: SmallSatisfactionMyDrawerResponseDTO = {
      status: 200,
      data: {
        myDrawerSmallSatisfactions: myDrawers
      }
    };
    return responseDTO;
  } catch (err) {
    console.error(err);
    const serverError: IFail = {
      status: 500,
      message: SERVER_ERROR_MESSAGE,
    };
    return serverError;
    }
  },
  community: async (token: String, sort: String) => {
    const user = await User.findOne({ id: token });
    if (!user) {
      const notExistUser: IFail = {
        status: 404,
        message: "유저가 존재하지 않습니다.",
      };
      return notExistUser;
    }
    
    try {
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

      let communityPosts: Array<CommunityResponseDTO> = new Array<CommunityResponseDTO>();
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
        nickname: communitySmallSatisfaction.nickname,
        moodImage: communitySmallSatisfaction.moodImage,
        mainImage: communitySmallSatisfaction.mainImage,
        likeCount: communitySmallSatisfaction.likes.length,
        content: communitySmallSatisfaction.content,
        hasLike: liked,
        hashtags: communitySmallSatisfaction.hashtags,
        year: communitySmallSatisfaction.year,
        month: communitySmallSatisfaction.month,
        day: communitySmallSatisfaction.day,
      }
      communityPosts.push(responseDTO);
    });
    
    const responseDTO: SmallSatisfactionCommunityResponseDTO = {
      status: 200,
      data: {
        hasSmallSatisfaction: smallSatisfactionWritten,
        userCount: userCount,
        community: communityPosts
      }
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
  },
  detail: async (token: String, postId: string) => {
    let postNumber = parseInt(postId);
    const user = await User.findOne({ id: token });
    if (!user) {
      const notExistUser: IFail = {
        status: 404,
        message: "유저가 존재하지 않습니다.",
      };
      return notExistUser;
    }

    try {
      let detailSmallSatisfaction = await SmallSatisfaction.findOne({ postId: postNumber });
      if (!detailSmallSatisfaction) {
          const notExistSatisfaction: IFail = {
            status: 404,
            message: "글을 불러올 수 없습니다!",
          };
          return notExistSatisfaction;
      }


      let liked;
      if (detailSmallSatisfaction.likes.filter((like) => like.user.toString() === user._id)
          .length > 0
      ) {
        liked = true;
      }
      else {
        liked = false;
      }
  
      let myDrawerUser = await User.findOne({ _id: detailSmallSatisfaction.user });
      let userNickname = myDrawerUser.nickname;
    
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
        }
      }
  
      return responseDTO; 
    } catch (err) {
    console.error(err.message);
    const serverError: IFail = {
      status: 500,
      message: SERVER_ERROR_MESSAGE,
    };
    return serverError;
    }
  },
  like: async (token: String, postId: string) => {
    try {
      let postNumber = parseInt(postId);
      const user = await User.findOne({ id: token });

      if (!user) {
        const notExistUser: IFail = {
          status: 404,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser
      }

      const smallSatisfaction = await SmallSatisfaction.findOne({ postId: postNumber });
      
      if (!smallSatisfaction) {
        const notExistSmallSatisfaction: IFail = {
          status: 404,
          message: "소확행이 존재하지 않습니다.",
        };
        return notExistSmallSatisfaction;
      }

      await smallSatisfaction.likes.unshift({ user: user._id });
      await smallSatisfaction.save();

      const responseDTO : LikeResponseDTO = {
        status: 200,
        message: "좋아요 성공!"
      }

      return responseDTO;
    } catch (error) {
      console.error(error.message);
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  },
  unlike: async (token: String, postId: string) => {
    try {
      let postNumber = parseInt(postId);
      const user = await User.findOne({ id: token });

      if (!user) {
        const notExistUser: IFail = {
          status: 404,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser
      }

      const smallSatisfaction = await SmallSatisfaction.findOne({ postId: postNumber });

      if (!smallSatisfaction) {
        const notExistSmallSatisfaction: IFail = {
          status: 404,
          message: "소확행이 존재하지 않습니다.",
        };
        return notExistSmallSatisfaction;
      }

      const removeIndex = smallSatisfaction.likes
        .map((like) => like.user)
        .indexOf(user._id);
  
      smallSatisfaction.likes.splice(removeIndex, 1);
      await smallSatisfaction.save();
      
      const responseDTO: LikeResponseDTO = {
        status: 200,
        message: "좋아요 취소 성공!"
      }
      return responseDTO;

    } catch (error) {
      console.error(error.message);
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  },
  delete: async (token: String, postId: string) => {
    try {
      let postNumber = parseInt(postId);
      const user = await User.findOne({ id: token });

      if (!user) {
        const notExistUser: IFail = {
          status: 404,
          message: "유저가 존재하지 않습니다.",
        };
        return notExistUser
      }

      const smallSatisfaction = await SmallSatisfaction.findOne({ postId: postNumber });

      if (!smallSatisfaction) {
        const notExistSmallSatisfaction: IFail = {
          status: 404,
          message: "소확행이 존재하지 않습니다.",
        };
        return notExistSmallSatisfaction;
      }

      await smallSatisfaction.remove();
      
      const responseDTO: DeleteResponseDTO = {
        status: 200,
        message: "포스트가 삭제되었습니다."
      }
      return responseDTO;

    } catch (error) {
      console.error(error.message);
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  },
}