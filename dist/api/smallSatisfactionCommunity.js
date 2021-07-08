"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const smallSatisfactionCommunityService_1 = __importDefault(require("../service/smallSatisfactionCommunityService"));
const router = express_1.default.Router();
/**
 * @api {post} /api/smallSatisfactionCommunity 커뮤니티 소확행 글 조회
 *
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionCommunity
 * @apiGroup SmallSatisfaction
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 * }
 *
 * @apiSuccess {String} jwt
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *	"status": 200,
 *	"data": {
 *			"hasSmallSaisfacion": false
 *			"userCount": 64
 *			"smallSatisfactions": [
 *			{
 *				"postId": 1
 *				"moodImage": "무드 이미지.png",
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasImage": false,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *			{
 *				"postId": 2
 *				"moodImage": "무드 이미지",
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasImage": false,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *		...
 *		]
 *	}
 * }
 *
 *
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 400,
 *  "message": "서버 에러입니다."
 * }
 */
router.get("/:sort", auth_1.default, async (req, res) => {
    const result = await smallSatisfactionCommunityService_1.default.community(req.body.user.id, req.params.sort);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=smallSatisfactionCommunity.js.map