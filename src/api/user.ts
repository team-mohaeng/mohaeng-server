import express, { Router } from "express";
import { check, validationResult } from "express-validator";

import UserSignInRequestDTO from "../dto/SignIn/UserSignInRequestDTO";
import userService from "../service/userService";

const router = express.Router();

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