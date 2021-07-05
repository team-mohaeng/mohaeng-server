"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../modules/upload"));
const writeSmallSatisfactionService_1 = __importDefault(require("../service/writeSmallSatisfactionService"));
const router = express_1.default.Router();
//field로 만들기 moodImage, mainImage, subImage
router.post("/", upload_1.default.fields([
    { name: 'moodImage', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 },
]), async (req, res) => {
    try {
        let moodImageUrl = req.files['moodImage'][0].location;
        let mainImageUrl, subImages;
        if (req.files['mainImage']) {
            mainImageUrl = req.files['mainImage'][0].location;
        }
        else {
            mainImageUrl = null;
            subImages = null;
        }
        //main, sub 모두 다 있을 경우
        if (req.files['mainImage'] && req.files['subImages']) {
            try {
                subImages = req.files['subImages'];
                for (let i = 0; i < subImages.length; i++) {
                    subImages[i] = subImages[i].location;
                }
            }
            catch (err) {
                //현지언니 질문
                res.json({ msg: "사진은 5장까지만 넣어주세요!" });
            }
        }
        else {
            subImages = null;
        }
        if (req.body.hashtags) {
            if ((req.body.hashtags).length > 5) {
                return res.status(404).json({ msg: "해시태그는 5개까지만 넣어주세요!" });
            }
        }
        const requestDTO = {
            content: req.body.content,
            moodText: req.body.moodText,
            moodImage: moodImageUrl,
            mainImage: mainImageUrl,
            subImages: subImages,
            hashtags: req.body.hashtags,
            isPrivate: req.body.isPrivate,
            date: req.body.date,
        };
        const result = await writeSmallSatisfactionService_1.default.smallSatisfaction(requestDTO);
        res.json(requestDTO);
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = router;
//# sourceMappingURL=writeSmallSatisfaction.js.map