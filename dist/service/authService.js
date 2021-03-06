"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("../models/User"));
const Course_1 = __importDefault(require("../models/Course"));
const constant_1 = require("../constant");
exports.default = {
    signup: async (dto) => {
        try {
            const { userId, userPw, nickname, gender, birthYear } = dto;
            let user = await User_1.default.findOne({ userId });
            if (user) {
                const duplicateId = {
                    status: 400,
                    message: "이미 사용 중인 이메일입니다.",
                };
                return duplicateId;
            }
            user = await User_1.default.findOne({ nickname });
            if (user) {
                const duplicateNickname = {
                    status: 400,
                    message: "이미 사용 중인 닉네임입니다",
                };
                return duplicateNickname;
            }
            user = new User_1.default({
                userId,
                userPw,
                nickname,
                gender,
                birthYear
            });
            const courses = await Course_1.default.find({});
            let userCourse = new Array();
            courses.forEach((course) => {
                let userChallenge = new Array();
                course.challenges.forEach((challenge) => {
                    userChallenge.push({
                        id: challenge.id,
                        situation: 0,
                        currentStamp: 0
                    });
                });
                userCourse.push({
                    course: course._id,
                    id: course.id,
                    situation: 0,
                    challenges: userChallenge
                });
            });
            user.courses = userCourse;
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
            const serverError = {
                status: 500,
                message: constant_1.SERVER_ERROR_MESSAGE,
            };
            return serverError;
        }
    }
};
//# sourceMappingURL=authService.js.map