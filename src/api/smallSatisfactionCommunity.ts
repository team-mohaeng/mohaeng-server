import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import smallSatisfactionCommunityService from "../service/smallSatisfactionCommunityService";

const router = express.Router();

/**
 * @api {post} /api/signup 회원가입
 * 
 * @apiVersion 1.0.0
 * @apiName SignUp
 * @apiGroup User
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "userId": "test1@gmail.com",
 *  "userPw": "1234abcd",
 *  // ...
 * }
 *
 * @apiSuccess {String} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    // ...
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 아이디 중복
 * {
 *  "status": 400,
 *  "message": "이미 사용 중인 아이디입니다."
 * }
 */

//apidoc 작성
router.get("/:sort", auth, async (req, res) => {
  const result = await smallSatisfactionCommunityService.community(req.body.user.id, req.params.sort);
  res.json(result);
});

module.exports = router;