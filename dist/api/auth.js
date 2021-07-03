"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authService_1 = __importDefault(require("../service/authService"));
const router = express_1.default.Router();
router.post("/", [
    express_validator_1.check("userId", "이메일 형태가 아닙니다.").isEmail(),
    express_validator_1.check("userPw", "비밀번호는 영문과 숫자를 포함한 8~16자로 입력해주세요.").isAlphanumeric().isLength({ min: 8, max: 16 }),
    express_validator_1.check("nickname", "입력 칸을 채워주세요!").isLength({ min: 1, max: 6 }),
    express_validator_1.check("gender", "입력 칸을 채워주세요!").not().isEmpty(),
    express_validator_1.check("birthYear", "입력 칸을 채워주세요!").not().isEmpty(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array()
        });
    }
    const requestDTO = {
        userId: req.body.userId,
        userPw: req.body.userPw,
        nickname: req.body.nickname,
        gender: req.body.gender,
        birthYear: req.body.birthYear
    };
    const result = await authService_1.default.signup(requestDTO);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=auth.js.map