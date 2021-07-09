"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userService_1 = __importDefault(require("../service/userService"));
const router = express_1.default.Router();
/**
 * @api {post} /api/signin 로그인
 *
 * @apiVersion 1.0.0
 * @apiName SignIn
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
 *  "userPw": "abcd1234",
 *  "userToken": "fcm token"
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
 * 404 가입하지 않은 아이디
 * {
 *  "status": 404,
 *  "message": "유저가 존재하지 않습니다."
 * }
 */
router.post("/", [
    express_validator_1.check("userId", "이메일 형태가 아닙니다.").isEmail(),
    express_validator_1.check("userPw", "비밀번호는 영문과 숫자를 포함한 8~16자로 입력해주세요.").isAlphanumeric().isLength({ min: 8, max: 16 }),
    express_validator_1.check("userToken", "유저 디바이스 토큰 값이 없습니다.").not().isEmpty(),
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
        userToken: req.body.userToken,
    };
    const result = await userService_1.default.signin(requestDTO);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=user.js.map