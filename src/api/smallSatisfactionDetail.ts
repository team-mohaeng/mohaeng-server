import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import smallSatisfactionDetailService from "../service/smallSatisfactionDetailService";

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
 *  "Bearer": "jwt"
 * }
 * 
 * @apiSuccess {String} nickname
 * @apiSuccess {Number} postId
 * @apiSuccess {String} mainImage
 * @apiSuccess {String} moodImage
 * @apiSuccess {Array} [hashtags]
 * @apiSuccess {String} content
 * @apiSuccess {Number} likeCount
 * @apiSuccess {Boolean} hasLike
 * @apiSuccess {Date} date
 * @apiSuccess {String} year
 * @apiSuccess {String} month
 * @apiSuccess {String} day
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *	"status": 200,
 *	"data": {
 *		"nickname": "할미 기연",
 *    "postId": 3,
 *		"mainImage": "mainImageUrl",
 *		"moodImage": "",
 *		"hashtags":  ["#맥주1", "#여름2", ... ],
 *		"content": "맛있는 피자에 시원한 맥주 ...",
 *		"likeCount": 72
 *		"hasLike": false
 *		"date": "2021.06.29",
 *    "year": "2021",
 *    "month": "7",
 *    "day": "9",
 *	}
 *}
 * 
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다."
 * }
 */

router.get("/:postId", auth, async (req, res) => {
  const result = await smallSatisfactionDetailService.myDrawer(req.body.user.id, req.params.postId);
  res.json(result);
});

module.exports = router;