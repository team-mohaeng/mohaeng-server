"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../modules/upload"));
const auth_1 = __importDefault(require("../middleware/auth"));
const writeSmallSatisfactionService_1 = __importDefault(require("../service/writeSmallSatisfactionService"));
const router = express_1.default.Router();
/**
 * @api {post} /api/writeSmallSatisfaction 소확행 작성
 *
 * @apiVersion 1.0.0
 * @apiName writeSmallSatisfaction
 * @apiGroup 소확행
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *	"moodImage": "moodUrl",
 *	"moodText": "그저 그런 하루",
 *	"content": "소확행 내용",
 *	"hashtags": ["#해시태그1", "#해시태그2", ... ],
 *	"mainImage": "mainImageUrl",
 *	"isPrivate": false
    }
 *
 * @apiSuccess {String} image
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "image" : mainImageUrl
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 * 400 해시태그 5개 이상
 * {
 *  "status": 400,
 *  "message": "해시태그는 5개까지만 넣어주세요!"
 * }
 *
 * 400 해시태그 6글자수 제한
 * {
 *  "status": 400,
 *  "message": "해시태그는 6글자 이내로 작성해주세요!"
 * }
 */
router.post("/", upload_1.default.fields([
    { name: 'moodImage', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
]), auth_1.default, async (req, res) => {
    let moodImageUrl = req.files['moodImage'][0].location;
    let mainImageUrl;
    //main 이미지만 있을 경우
    if (req.files['mainImage']) {
        mainImageUrl = req.files['mainImage'][0].location;
    }
    //이미지 없는 경우
    else {
        mainImageUrl = "";
    }
    if (req.body.hashtags) {
        if ((req.body.hashtags).length > 5) {
            return res.status(404).json({ msg: "해시태그는 5개까지만 넣어주세요!" });
        }
        req.body.hashtags.forEach((hashtag) => {
            if (hashtag.length > 7) {
                return res.status(404).json({ msg: "해시태그는 6글자 이내로 작성해주세요!" });
            }
        });
    }
    const requestDTO = {
        content: req.body.content,
        moodText: req.body.moodText,
        moodImage: moodImageUrl,
        mainImage: mainImageUrl,
        hashtags: req.body.hashtags,
        isPrivate: req.body.isPrivate,
    };
    const result = await writeSmallSatisfactionService_1.default.writeSmallSatisfaction(req.body.user.id, requestDTO);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=writeSmallSatisfaction.js.map