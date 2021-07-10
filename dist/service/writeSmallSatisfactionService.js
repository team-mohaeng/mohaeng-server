"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallSatisfaction_1 = __importDefault(require("../models/SmallSatisfaction"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    writeSmallSatisfaction: async (token, dto) => {
        let today = new Date();
        let todayYear = today.getFullYear().toString();
        let todayMonth = (today.getMonth() + 1).toString();
        let todayDay = today.getDate().toString();
        let smallSatisfactionCount = await SmallSatisfaction_1.default.countDocuments();
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
                status: 400,
                message: "유저가 존재하지 않습니다.",
            };
            return notExistUser;
        }
        try {
            const { content, moodText, moodImage, mainImage, hashtags, isPrivate, } = dto;
            let smallSatisfaction = new SmallSatisfaction_1.default({
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
            const responseDTO = {
                status: 200,
                data: {
                    image: mainImage,
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=writeSmallSatisfactionService.js.map