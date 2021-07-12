"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
const constant_1 = require("../constant");
exports.default = {
    reHome: async (token) => {
        let user, userCourse, dummyCourse;
        const userPromise = new Promise(async (resolve, reject) => {
            const userP = await User_1.default.findOne({ id: token });
            if (!userP) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                reject(notExistUser);
            }
            user = userP;
            const userCourseP = user.courses.find((course) => course.situation === 1);
            if (!userCourseP) {
                const notProgressUser = {
                    status: 200,
                    data: {
                        situation: user.situation,
                        affinity: user.affinity
                    }
                };
                reject(notProgressUser);
            }
            userCourse = userCourseP;
            resolve("success");
        });
        let userChallengeArray = new Array();
        const coursePromise = new Promise(async (resolve, reject) => {
            const courseP = await Course_1.default.find();
            const dummyCourseP = courseP.find((course) => course.id === userCourse.id);
            dummyCourse = dummyCourseP;
            userCourse.challenges.forEach((challenge) => {
                const dummyChallengeP = dummyCourseP.challenges.find((c) => c.id === challenge.id);
                let ments = new Array();
                dummyChallengeP.userMents.forEach((ment) => {
                    ments.push(ment.ment);
                });
                userChallengeArray.push({
                    id: challenge.id,
                    situation: challenge.situation,
                    title: dummyChallengeP.title,
                    description: dummyChallengeP.description,
                    year: challenge.year,
                    month: challenge.month,
                    day: challenge.day,
                    currentStamp: challenge.currentStamp,
                    totalStamp: dummyChallengeP.totalStamp,
                    userMents: ments
                });
            });
            resolve("success");
        });
        let response;
        await Promise.all([userPromise, coursePromise])
            .then((data) => {
            const responseDTO = {
                status: 200,
                data: {
                    situation: user.situation,
                    affinity: user.affinity,
                    course: {
                        id: userCourse.id,
                        situation: userCourse.situation,
                        title: dummyCourse.title,
                        description: dummyCourse.title,
                        totalDays: dummyCourse.totalDays,
                        property: dummyCourse.property,
                        challenges: userChallengeArray
                    }
                }
            };
            response = responseDTO;
        })
            .catch((err) => {
            response = err;
            console.log(err);
        });
        return response;
    },
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
            const userCourse = user.courses.find((course) => course.situation === 1);
            if (!userCourse) {
                const notProgressUser = {
                    status: 200,
                    data: {
                        situation: user.situation,
                        affinity: user.affinity
                    }
                };
                return notProgressUser;
            }
            const dummyCourseList = await Course_1.default.find();
            const dummyCourse = dummyCourseList.find((course) => course.id === userCourse.id);
            let userChallengeArray = new Array();
            userCourse.challenges.forEach((challenge) => {
                const dummyChallenge = dummyCourse.challenges.find((c) => c.id === challenge.id);
                let ments = new Array();
                dummyChallenge.userMents.forEach((ment) => {
                    ments.push(ment.ment);
                });
                userChallengeArray.push({
                    id: challenge.id,
                    situation: challenge.situation,
                    title: dummyChallenge.title,
                    description: dummyChallenge.description,
                    year: challenge.year,
                    month: challenge.month,
                    day: challenge.day,
                    currentStamp: challenge.currentStamp,
                    totalStamp: dummyChallenge.totalStamp,
                    userMents: ments
                });
            });
            const responseDTO = {
                status: 200,
                data: {
                    situation: user.situation,
                    affinity: user.affinity,
                    course: {
                        id: userCourse.id,
                        situation: userCourse.situation,
                        title: dummyCourse.title,
                        description: dummyCourse.title,
                        totalDays: dummyCourse.totalDays,
                        property: dummyCourse.property,
                        challenges: userChallengeArray
                    }
                }
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
//# sourceMappingURL=homeService.js.map