"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallSatisfaction_1 = __importDefault(require("../models/SmallSatisfaction"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    myDrawer: async (token, year, month) => {
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
                status: 400,
                message: "유저가 존재하지 않습니다.",
            };
            return notExistUser;
        }
        try {
            let myDrawerSmallSatisfactions;
            myDrawerSmallSatisfactions = await SmallSatisfaction_1.default.find({ user: user._id, year: year, month: month }).sort({ date: -1 });
            let responseSmallSatisfaction = new Array();
            myDrawerSmallSatisfactions.forEach((myDrawerSmallSatisfaction) => {
                let liked;
                if (myDrawerSmallSatisfaction.likes.filter((like) => like.user.toString() === token)
                    .length > 0) {
                    liked = true;
                }
                else {
                    liked = false;
                }
                const responseDTO = {
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
                    date: myDrawerSmallSatisfaction.date,
                };
                responseSmallSatisfaction.push(responseDTO);
            });
            const responseDTO = {
                status: 200,
                data: {
                    myDrawerSmallSatisfaction: responseSmallSatisfaction,
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=smallSatisfactionMyDrawerService.js.map