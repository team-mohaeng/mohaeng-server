import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import SmallSatisfactionMyDrawerRequestDTO from "../dto/SmallSatisfaction/MyDrawer/request/SmallSatisfactionMyDrawerRequestDTO";
import smallSatisfactionMyDrawerService from "../service/smallSatisfactionMyDrawerService";

const router = express.Router();

/**
 * @api {post} /api/smallSatisfactionMyDrawer 내서랍장 소확행 글 조회
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionCommunityMyDrawer 
 * @apiGroup SmallSatisfaction
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "year": 2021,
 *  "month": 7,
 * }
 *
 * @apiSuccess {Array} [myDrawerSmallSatisfactions]
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
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */

router.post("/", auth, async (req, res) => {
  const requestDTO: SmallSatisfactionMyDrawerRequestDTO = {
    year: req.body.year,
    month: req.body.month,
  };

  const result = await smallSatisfactionMyDrawerService.myDrawer(req.body.user.id, requestDTO);
  res.json(result);
});

module.exports = router;