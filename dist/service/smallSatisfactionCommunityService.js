"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallSatisfaction_1 = __importDefault(require("../models/SmallSatisfaction"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    community: async (token, sort) => {
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
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
        let hasSmallSatisfaction = await SmallSatisfaction_1.default.findOne({ year: todayYear, month: todayMonth, day: todayDay, user: user._id });
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
        const userCount = await SmallSatisfaction_1.default.findOne({ year: todayYear, month: todayMonth, day: todayDay }).countDocuments();
        let communitySmallSatisfactions;
        if (sort === "date") {
            communitySmallSatisfactions = await SmallSatisfaction_1.default.find({ isPrivate: false }).sort({ date: -1 });
        }
        if (sort === "like") {
            communitySmallSatisfactions = await SmallSatisfaction_1.default.find({ isPrivate: false }).sort({ likeCount: -1 });
        }
        try {
            let responseSmallSatisfaction = new Array();
            communitySmallSatisfactions.forEach((communitySmallSatisfaction) => {
                let liked;
                if (communitySmallSatisfaction.likes.filter((like) => like.user.toString() === token)
                    .length > 0) {
                    liked = true;
                }
                else {
                    liked = false;
                }
                const responseDTO = {
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
                };
                responseSmallSatisfaction.push(responseDTO);
            });
            const responseDTO = {
                status: 200,
                data: {
                    hasSmallSatisfaction: smallSatisfactionWritten,
                    userCount: userCount,
                    smallSatisfactions: responseSmallSatisfaction,
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=smallSatisfactionCommunityService.js.map