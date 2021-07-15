"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("../models/User"));
const constant_1 = require("../constant");
exports.default = {
    signin: async (dto) => {
        try {
            const { userId, userPw, userToken } = dto;
            let user = await User_1.default.findOne({ userId });
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
            // const courses = await Course.find({});
            // let userCourse: Array<IUserCourse> = new Array<IUserCourse>();
            // courses.forEach((course) => {
            //   let userChallenge: Array<IUserChallenge> = new Array<IUserChallenge>();
            //   course.challenges.forEach((challenge) => {
            //     userChallenge.push(
            //       {
            //         id: challenge.id,
            //         situation: 0,
            //         currentStamp: 0
            //       }
            //     );
            //   });
            //   userCourse.push(
            //     {
            //       course: course._id,
            //       id: course.id,
            //       situation: 0,
            //       challenges: userChallenge
            //     }
            //   );
            // });
            // user.courses = userCourse;
            user.id = userToken;
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
//# sourceMappingURL=userService.js.map