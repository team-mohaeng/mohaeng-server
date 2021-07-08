import express, { Request, Response } from "express";
import SmallSatisfactionMyDrawerRequestDTO from "../dto/SmallSatisfaction/MyDrawer/request/SmallSatisfactionMyDrawerRequestDTO";
import auth from "../middleware/auth";
import smallSatisfactionMyDrawerService from "../service/smallSatisfactionMyDrawerService";

const router = express.Router();

/**
 * @api {get} /api/smallSatisfactionMyDrawer 내서랍장 소확행 글 조회
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionCommunityMyDrawer 
 * @apiGroup SmallSatisfaction
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "year": 2021,
 *  "month": 7,
 * }
 *
 * @apiSuccess {String} jwt
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

router.post("/", auth, async (req, res) => {
  const requestDTO: SmallSatisfactionMyDrawerRequestDTO = {
    year: req.body.year,
    month: req.body.month,
  };

  const result = await smallSatisfactionMyDrawerService.myDrawer(req.body.user.id, requestDTO);
  res.json(result);
});

module.exports = router;