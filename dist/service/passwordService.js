"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("../models/User"));
const password_1 = __importDefault(require("../controller/password"));
exports.default = {
    user: async (id) => {
        try {
            const user = await User_1.default.findOne({ userId: id });
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            const number = await password_1.default.email(id);
            if (!number) {
                const notValidationEmail = {
                    status: 400,
                    message: "유효하지 않은 이메일입니다."
                };
                return notValidationEmail;
            }
            const response = {
                status: 200,
                data: {
                    number: number,
                }
            };
            return response;
        }
        catch (err) {
            console.error(err.message);
        }
    },
    change: async (dto) => {
        try {
            const { userId, userPw } = dto;
            const user = await User_1.default.findOne({ userId });
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            user.userPw = userPw;
            const salt = await bcryptjs_1.default.genSalt(10);
            user.userPw = await bcryptjs_1.default.hash(userPw, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret);
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
//# sourceMappingURL=passwordService.js.map