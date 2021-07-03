import express, { Router } from "express";
import { check, validationResult } from "express-validator";

import UserSignInRequestDTO from "../dto/SignIn/UserSignInRequestDTO";
import userService from "../service/userService";

const router = express.Router();

/**
 * @api {post} /api/signin 로그인
 * 
 * @apiVersion 1.0.0
 * @apiName SignIn
 * @apiGroup User
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * 
 * @apiSuccess {String} jwt
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "userId": "test1@gmail.com",
 *  "userPw": "1234abcd"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "jwt": "jwt토큰"
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 404 가입하지 않은 아이디
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 */
router.post(
  "/",
  [
    check("userId", "이메일 형태가 아닙니다.").isEmail(),
    check("userPw", "비밀번호는 영문과 숫자를 포함한 8~16자로 입력해주세요.").isAlphanumeric().isLength({ min: 8, max: 16 }),
    check("userToken", "유저 디바이스 토큰 값이 없습니다.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const requestDTO: UserSignInRequestDTO = {
      userId: req.body.userId,
      userPw: req.body.userPw,
      userToken: req.body.userToken,
    };

    const result = await userService.signin(requestDTO);

    res.json(result);
  }
);

module.exports = router;