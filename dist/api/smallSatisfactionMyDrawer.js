"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const smallSatisfactionMyDrawerService_1 = __importDefault(require("../service/smallSatisfactionMyDrawerService"));
const router = express_1.default.Router();
/**
 * @api {get} /api/smallSatisfactionMyDrawer/:year/:month 내서랍장 소확행 글 조회
 *
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionMyDrawer
 * @apiGroup 소확행
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 *
 *
 * @apiSuccess {Array} [myDrawerSmallSatisfactions]
 * @apiSuccess {Number} postId
 * @apiSuccess {String} moodImage
 * @apiSuccess {String} mainImage
 * @apiSuccess {Array} [hashtags]
 * @apiSuccess {String} content
 * @apiSuccess {Number} likeCount
 * @apiSuccess {Boolean} hasLike
 * @apiSuccess {String} nickname
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *	"status": 200,
 *	"data": {
 *			"smallSatisfactions": [
 *			{
 *				"postId": 1
 *				"moodImage": "moodImage.png",
 *        "mainImage": "mainImage.png"
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *			{
 *				"postId": 2
 *				"moodImage": "moodImage.png",
 *        "mainImage": "mainImage.png"
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
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
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */
router.get("/:year/:month", auth_1.default, async (req, res) => {
    const result = await smallSatisfactionMyDrawerService_1.default.myDrawer(req.body.user.id, req.params.year, req.params.month);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=smallSatisfactionMyDrawer.js.map