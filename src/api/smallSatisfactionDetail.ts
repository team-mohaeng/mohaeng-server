import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import smallSatisfactionDetailService from "../service/smallSatisfactionDetailService";

const router = express.Router();

/**
 * @api {get} /api/smallSatisfactionDetail 소확행 상세보기 조회
 * 
 * @apiVersion 1.0.0
 * @apiName smallSatisfactionDetail
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
 * @apiSuccess {Array} hashtags
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
 *  "status": 200,
 *  "data": {
 *    "nickname": "시원스쿨",
 *    "postId": 4,
 *    "mainImage": "mainImageUrl",
 *    "moodImage": "moodImageUrl",
 *    "hashtags": ["#맥주", "#여름"],
 *    "content": "맛있는 피자에 시원한 맥주 ...",
 *    "likeCount": 72,
 *    "hasLike": false,
 *    "date": "2021.06.29",
 *    "year": "2021",
 *    "month": "6",
 *    "day": "29",
 *  }
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

router.get("/:postId", auth, async (req, res) => {
  const result = await smallSatisfactionDetailService.myDrawer(req.body.user.id, req.params.postId);
  res.json(result);
});

module.exports = router;
