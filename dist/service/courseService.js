"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    library: async (token) => {
        try {
            let user = await User_1.default.findOne({ id: token });
            let courses = await Course_1.default.find({});
            let progressCourseId;
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            user.courses.forEach((course) => {
                if (course.situation === 1)
                    progressCourseId = course.id;
            });
            courses = courses.filter((course) => course.id != progressCourseId);
            let courseLibraryArray = new Array();
            courses.forEach((course) => {
                let challengeLibraryArray = new Array();
                const userCourse = user.courses[course.id - 1];
                course.challenges.forEach((challenge) => {
                    const userChallenge = userCourse.challenges[challenge.id - 1];
                    let ments = new Array();
                    challenge.userMents.forEach((ment) => {
                        ments.push(ment.ment);
                    });
                    challengeLibraryArray.push({
                        id: challenge.id,
                        situation: userChallenge.situation,
                        title: challenge.title,
                        description: challenge.description,
                        year: userChallenge.year,
                        month: userChallenge.month,
                        day: userChallenge.day,
                        currentStamp: userChallenge.currentStamp,
                        totalStamp: challenge.totalStamp,
                        userMents: ments
                    });
                });
                courseLibraryArray.push({
                    id: course.id,
                    situation: userCourse.situation,
                    title: course.title,
                    description: course.description,
                    totalDays: course.totalDays,
                    property: course.property,
                    challenges: challengeLibraryArray
                });
            });
            courseLibraryArray = courseLibraryArray.sort((a, b) => (a.situation > b.situation) ? -1 : Number(a.situation > b.situation));
            const responseDTO = {
                status: 200,
                data: {
                    courses: courseLibraryArray
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    },
    progress: async (token, id) => {
        try {
            const courseId = Number(id);
            let user = await User_1.default.findOne({ id: token });
            let progressCourseId;
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            const dummyCourse = await Course_1.default.findOne({ id: id });
            if (!dummyCourse) {
                const notExistCourse = {
                    status: 404,
                    message: "해당 id의 코스가 존재하지 않습니다",
                };
                return notExistCourse;
            }
            user.courses.forEach((course) => {
                if (course.situation === 1)
                    progressCourseId = course.id;
            });
            if (progressCourseId != null) {
                user.courses[progressCourseId - 1].situation = 0;
                let userChallenge = new Array();
                user.courses[progressCourseId - 1].challenges.forEach((challenge) => {
                    userChallenge.push({
                        id: challenge.id,
                        situation: 0,
                        currentStamp: 0
                    });
                });
                user.courses[progressCourseId - 1].challenges = userChallenge;
                await user.save();
            }
            user.courses[courseId - 1].situation = 1;
            user.courses[courseId - 1].challenges[0].situation = 1;
            await user.save();
            let challengeProgressArray = new Array();
            user.courses[courseId - 1].challenges.forEach((challenge) => {
                const dummyChallenge = dummyCourse.challenges[challenge.id - 1];
                let ments = new Array();
                dummyChallenge.userMents.forEach((ment) => {
                    ments.push(ment.ment);
                });
                challengeProgressArray.push({
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
                    course: {
                        id: user.courses[courseId - 1].id,
                        situation: user.courses[courseId - 1].situation,
                        title: dummyCourse.title,
                        description: dummyCourse.description,
                        totalDays: dummyCourse.totalDays,
                        property: dummyCourse.property,
                        challenges: challengeProgressArray
                    }
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=courseService.js.map