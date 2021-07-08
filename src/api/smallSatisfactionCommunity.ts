import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import smallSatisfactionCommunityService from "../service/smallSatisfactionCommunityService";

const router = express.Router();

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
 *  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZXA0UmhZcmJUSE9uaHpBUldOVFNTMTpBUEE5MWJIS1pGdkJuUkV1dEEtYzQxSmN6dDBITzVJQkNyMFhzM0VadjFFcUZSVl9jY05semtDbFQtaWxmT3FGTUFWTmFPUFYxaVhIQjIybHhrcHZJRWNTNW4tMjQtZzY2SVR1d0o1aW9aWlJtYVd5R1Q3XzZiUDhlR1BOZHd2SkNwUWxZb1daQlhHVCJ9LCJpYXQiOjE2MjU3NjAxOTUsImV4cCI6MTYyNTc5NjE5NX0.jcxHZIN8cT268jCg98674B3rksW7gEb1tkNtfg1SfXU"
 * }
 * 
 *
 * @apiSuccess {Boolean} hasSmallSatisfaction
 * @apiSuccess {Number} userCount
 * @apiSuccess {Array} [smallSatisfactions]
 * @apiSuccess {Number} postId
 * @apiSuccess {String} moodImage
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
 *			"hasSmallSaisfacion": false
 *			"userCount": 64
 *			"smallSatisfactions": [
 *			{
 *				"postId": 1
 *				"moodImage": "무드 이미지.png",
 *				"hashtags": ["#해쉬태그1", "#해쉬태그2", ... ],
 *				"content": "맛있는 피자에 시원한 맥주 ... ",
 *				"likeCount": 72,
 *				"hasLike": true,
 *				"nickname": "시원스쿨"
 *			},
 *			{
 *				"postId": 2
 *				"moodImage": "무드 이미지",
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
 *  "status": 400,
 *  "message": "서버 에러입니다."
 * }
 */

router.get("/:sort", auth, async (req, res) => {
  const result = await smallSatisfactionCommunityService.community(req.body.user.id, req.params.sort);
  res.json(result);
});

module.exports = router;