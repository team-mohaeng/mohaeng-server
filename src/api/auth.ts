import express from "express";
import { check, validationResult } from "express-validator";

import UserSignUpRequestDTO from "../dto/SignUp/UserSignUpRequestDTO";
import authService from "../service/authService";

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
 *  "nickname": "test1",
 *  "gender": 0,
 *  "birthYear": 1998
 * }
 * 
 * @apiSuccess {String} jwt
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
 * 400 아이디 중복
 * {
 *  "status": 400,
 *  "message": "이미 사용 중인 아이디입니다."
 * }
 */
router.post(
  "/",
  [
    check("userId", "이메일 형태가 아닙니다.").isEmail(),
    check("userPw", "비밀번호는 영문과 숫자를 포함한 8~16자로 입력해주세요.").isAlphanumeric().isLength({ min: 8, max: 16 }),
    check("nickname", "닉네임은 2~6글자 사이입니다.").isLength({ min: 2, max: 6 }),
    check("gender", "입력 칸을 채워주세요!").not().isEmpty(),
    check("birthYear", "입력 칸을 채워주세요!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 400,
        errors: errors.array()
      });
    }

    const requestDTO: UserSignUpRequestDTO = {
      userId: req.body.userId,
      userPw: req.body.userPw,
      nickname: req.body.nickname,
      gender: req.body.gender,
      birthYear: req.body.birthYear
    };

    const result = await authService.signup(requestDTO);

    res.json(result);
  }
);

module.exports = router;