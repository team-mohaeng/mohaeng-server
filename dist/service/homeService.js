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
            let userCourseArray = new Array();
            const dummyCourseList = await Course_1.default.find();
            user.courses.forEach((course) => {
                let userChallengeArray = new Array();
                const dummyCourse = dummyCourseList[course.id - 1];
                course.challenges.forEach((challenge) => {
                    const dummyChallenge = dummyCourse.challenges[challenge.id - 1];
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
                userCourseArray.push({
                    id: course.id,
                    situation: course.situation,
                    title: dummyCourse.title,
                    description: dummyCourse.description,
                    totalDays: dummyCourse.totalDays,
                    property: dummyCourse.property,
                    challenges: userChallengeArray
                });
            });
            const responseDTO = {
                status: 200,
                data: {
                    situation: user.situation,
                    affinity: user.affinity,
                    courses: userCourseArray
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=homeService.js.map