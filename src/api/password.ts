import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import password from "../controller/password";
import ChangePasswordRequestDTO from "../dto/Password/ChangePasswordRequestDTO";
import passwordService from "../service/passwordService";

const router = express.Router();

/**
 * @api {get} /api/password/:userId 이메일 인증
 * 
 * @apiVersion 1.0.0
 * @apiName CheckEmail
 * @apiGroup 유저
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * 
 * @apiSuccess {Number} number 랜덤 인증번호
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *   "status": 200,
 *   "data": {
 *     "number": 1111
 *   }
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 * 404 가입하지 않은 이메일
 * {
 *   "status": 404,
 *   "message": "유저가 존재하지 않습니다."
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 * 400 이메일 전송 실패
 * {
 *   "status": 400,
 *   "message": "유효하지 않은 이메일입니다."
 * }
 */
router.get("/:userId", async (req, res) => {
  const result = await passwordService.user(req.params.userId);

  res.status(result.status).json(result);
});

/**
 * @api {put} /api/password 비밀번호 변경
 * 
 * @apiVersion 1.0.0
 * @apiName ChangePassword
 * @apiGroup 유저
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "userId": "test1@gmail.com",
 *  "userPw": "1234abcd"
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
 * @apiErrorExample {json} Error-Response:
 * 404 가입하지 않은 이메일
 * {
 *   "status": 404,
 *   "message": "유저가 존재하지 않습니다."
 * }
 */
router.put(
  "/", 
  [
    check("userId", "이메일 형태가 아닙니다.").isEmail(),
    check("userPw", "비밀번호는 영문과 숫자를 포함한 8~16자로 입력해주세요.").isAlphanumeric().isLength({ min: 8, max: 16 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 400,
        errors: errors.array()
      });
    }

    const requestDTO: ChangePasswordRequestDTO = {
      userId: req.body.userId,
      userPw: req.body.userPw
    };

    const result = await passwordService.change(requestDTO);

    res.status(result.status).json(result);
  });

module.exports = router;