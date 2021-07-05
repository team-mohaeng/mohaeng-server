"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallSatisfaction_1 = __importDefault(require("../models/SmallSatisfaction"));
exports.default = {
    smallSatisfaction: async (dto) => {
        try {
            const { content, moodText, moodImage, mainImage, subImages, hashtags, isPrivate, date, } = dto;
            let smallSatisfaction = new SmallSatisfaction_1.default({
                content,
                moodText,
                moodImage,
                mainImage,
                subImages,
                hashtags,
                isPrivate,
                date
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