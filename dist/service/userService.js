"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    signin: async (dto) => {
        try {
            const { userId, userPw, userToken } = dto;
            let user = await User_1.default.findOne({ userId });
            console.log(user);
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            const isMatch = await bcryptjs_1.default.compare(userPw, user.userPw);
            if (!isMatch) {
                const notMatchPw = {
                    status: 400,
                    message: "비밀번호가 일치하지 않습니다.",
                };
                return notMatchPw;
            }
            user.id = userToken;
            await user.save();
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: 36000 });
            const responseDTO = {
                status: 200,
                data: {
                    jwt: jwtToken,
                },
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=userService.js.map