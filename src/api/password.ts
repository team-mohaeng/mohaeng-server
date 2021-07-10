import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import password from "../controller/password";
import ChangePasswordRequestDTO from "../dto/Password/ChangePasswordRequestDTO";
import passwordService from "../service/passwordService";

const router = express.Router();

router.get("/userId/:userId", async (req, res) => {
  const result = await passwordService.user(req.params.userId);

  res.json(result);
});

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

    res.json(result);
  }
  )

module.exports = router;