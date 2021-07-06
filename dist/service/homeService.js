"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    home: async (token) => {
        try {
            let user = await User_1.default.findOne({ id: token });
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            if (user.situation != 0) {
                let userCourse;
                let userChallenge;
                user.courses.forEach((course) => {
                    if (course.situation == 1) {
                        userCourse = course;
                    }
                });
                userCourse.challenges.forEach((challenge) => {
                    if (challenge.situation === 1) {
                        userChallenge = challenge;
                    }
                });
                const progressCourse = await Course_1.default.findOne({ id: userCourse.id });
                console.log(progressCourse);
                const responseDTO = {
                    status: 200,
                    data: {
                        situation: user.situation,
                        affinity: user.affinity,
                        course: {
                            title: progressCourse.title,
                            property: progressCourse.property,
                        },
                        challenge: {
                            day: userChallenge.day,
                        },
                    },
                };
                return responseDTO;
            }
            const responseDTO = {
                status: 200,
                data: {
                    situation: user.situation,
                    affinity: user.affinity,
                },
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=homeService.js.map