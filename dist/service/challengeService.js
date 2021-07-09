"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Course_1 = __importDefault(require("../models/Course"));
const challengeDateFormatter_1 = require("../formatter/challengeDateFormatter");
const dateController_1 = require("../controller/dateController");
exports.default = {
    today: async (token, courseId) => {
        try {
            const user = await User_1.default.findOne({ id: token });
            const courses = await Course_1.default.find();
            let dummyCourse = await Course_1.default.findOne({ id: courseId });
            let progressCourseId = Number(courseId);
            let progressChallengeId;
            const today = new Date();
            // user jwt 토큰으로 유저 식별
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            // 해당 코스가 존재하지 않을 때
            if (!dummyCourse) {
                const notExistCourse = {
                    status: 404,
                    message: "해당 id의 코스가 존재하지 않습니다",
                };
                return notExistCourse;
            }
            // 진행 중인 코스가 아닐 경우
            if (user.courses.filter((course) => course.situation != 0)
                .pop().id != progressCourseId) {
                const notProgressCourse = {
                    status: 400,
                    message: "현재 진행 중인 코스가 아닙니다.",
                };
                return notProgressCourse;
            }
            let userCourse = user.courses.find((course) => course.id === progressCourseId);
            let challenge = user.courses.find((course) => course.id === progressCourseId)
                .challenges.sort((a, b) => (a.id > b.id) ? -1 : Number(a.id > b.id))
                .find((challenge) => challenge.situation === 1);
            if (challenge) {
                progressChallengeId = challenge.id;
                if (!dateController_1.isSameDay(challenge.date, today)) {
                    user.courses.find((course) => course.id === progressCourseId)
                        .challenges.find((challenge) => challenge.id === progressChallengeId)
                        .currentStamp = 0;
                    user.courses.find((course) => course.id === progressCourseId)
                        .challenges.find((challenge) => challenge.id === progressChallengeId)
                        .date = today;
                }
            }
            else {
                challenge = user.courses.find((course) => course.id === progressCourseId)
                    .challenges.sort((a, b) => (a.id > b.id) ? -1 : Number(a.id > b.id))
                    .find((challenge) => challenge.situation === 2);
                if (challenge) {
                    progressChallengeId = challenge.id;
                    if (!dateController_1.isSameDay(challenge.date, today) && (progressChallengeId <= dummyCourse.challenges.length)) {
                        progressChallengeId = challenge.id + 1;
                        user.courses.find((course) => course.id === progressCourseId)
                            .challenges.find((challenge) => challenge.id === progressChallengeId)
                            .situation = 1;
                        user.courses.find((course) => course.id === progressCourseId)
                            .challenges.find((challenge) => challenge.id === progressChallengeId)
                            .date = today;
                    }
                }
            }
            user.courses.find((course) => course.id === progressCourseId)
                .challenges.sort((a, b) => (a.id < b.id) ? -1 : Number(a.id < b.id));
            await user.save();
            // dummy data
            dummyCourse = courses.find((course) => course.id === progressCourseId);
            const dummyChallenge = courses.find((course) => course.id === progressCourseId)
                .challenges.find((challenge) => challenge.id === progressChallengeId);
            // response할 challenge 배열 만들어서 저장
            let challengeArray = new Array();
            userCourse.challenges.forEach((challenge) => {
                let ments = new Array();
                dummyChallenge
                    .userMents.forEach((ment) => {
                    ments.push(ment.ment);
                });
                const responseChallenge = {
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
                };
                challengeArray.push(responseChallenge);
            });
            // 최종 responseDTO
            const responseDTO = {
                status: 200,
                data: {
                    course: {
                        id: userCourse.id,
                        situation: userCourse.situation,
                        title: dummyCourse.title,
                        description: dummyCourse.description,
                        totalDays: dummyCourse.totalDays,
                        property: dummyCourse.property,
                        challenges: challengeArray,
                    },
                },
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    },
    stamp: async (token, courseId, challengeId) => {
        try {
            const user = await User_1.default.findOne({ id: token });
            const courses = await Course_1.default.find();
            let dummyCourse = await Course_1.default.findOne({ id: courseId });
            const progressCourseId = Number(courseId);
            const progressChallengeId = Number(challengeId);
            const today = new Date();
            // user jwt 토큰으로 유저 식별
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            // 해당 코스가 존재하지 않을 때
            if (!dummyCourse) {
                const notExistCourse = {
                    status: 404,
                    message: "해당 id의 코스가 존재하지 않습니다",
                };
                return notExistCourse;
            }
            // 진행 중인 코스가 아닐 경우
            if (user.courses.filter((course) => (course.situation === 0) && (course.id === progressCourseId))
                .length > 0) {
                const notProgressCourse = {
                    status: 400,
                    message: "현재 진행 중인 코스가 아닙니다.",
                };
                return notProgressCourse;
            }
            // 해당 challenge id가 진행 중이 아닐 경우
            if (user.courses.find((course) => course.id === progressCourseId)
                .challenges.filter((challenge) => (challenge.situation === 0) && (challenge.id === progressChallengeId))
                .length > 0) {
                const notProgressChallenge = {
                    status: 400,
                    message: "현재 진행 중인 챌린지가 아닙니다.",
                };
                return notProgressChallenge;
            }
            const userCourse = user.courses[progressCourseId - 1];
            // 챌린지가 존재하지 않을 경우
            if (userCourse.challenges.length < progressChallengeId) {
                const notExistChallenge = {
                    status: 404,
                    message: "해당 챌린지가 존재하지 않습니다.",
                };
                return notExistChallenge;
            }
            // dummy data
            dummyCourse = courses[progressCourseId - 1];
            const dummyChallenge = courses[progressCourseId - 1].challenges;
            // stamp
            const currentStamp = user.courses.find((course) => course.id === progressCourseId)
                .challenges.find((challenge) => challenge.id === progressChallengeId).currentStamp;
            const totalStamp = courses.find((course) => course.id === progressCourseId)
                .challenges.find((challenge) => challenge.id === progressChallengeId).totalStamp;
            // stamp 인증 처리
            user.courses.find((course) => course.id === progressCourseId)
                .challenges.find((challenge) => challenge.id === progressChallengeId).currentStamp = currentStamp + 1;
            // 인증 완료
            if (currentStamp + 1 === totalStamp) {
                user.courses.find((course) => course.id === progressCourseId)
                    .challenges.find((challenge) => challenge.id === progressChallengeId).situation = 2;
                user.affinity = user.affinity + 2;
                user.courses.find((course) => course.id === progressCourseId)
                    .challenges.find((challenge) => challenge.id === progressChallengeId).year = challengeDateFormatter_1.getYear();
                user.courses.find((course) => course.id === progressCourseId)
                    .challenges.find((challenge) => challenge.id === progressChallengeId).month = challengeDateFormatter_1.getMonth();
                user.courses.find((course) => course.id === progressCourseId)
                    .challenges.find((challenge) => challenge.id === progressChallengeId).day = challengeDateFormatter_1.getDay();
                // 현재 코스의 마지막 챌린지일 때 코스 situation을 진행 완료로 변경
                if (userCourse.challenges.length === progressChallengeId) {
                    user.courses.find((course) => course.id === progressCourseId).situation = 2;
                    user.situation = 0;
                }
                // 최근 챌린지 성공 날짜가 어제라면, 연속 count + 1
                if (user.success.recentDate == new Date(today.setDate(today.getDate() - 1))) {
                    user.success.currentCount = user.success.currentCount + 1;
                }
                else { // 아니면 count = 1
                    user.success.currentCount = 1;
                }
                user.success.recentDate = today;
                // 현재 연속 성공 횟수가 max보다 많으면, max = current
                if (user.success.currentCount > user.success.maxCount) {
                    user.success.maxCount = user.success.currentCount;
                }
            }
            await user.save();
            let challengeArray = new Array();
            userCourse.challenges.forEach((challenge) => {
                let ments = new Array();
                const currentChallenge = courses.find((course) => course.id === progressCourseId)
                    .challenges.find((challenge) => challenge.id === progressChallengeId);
                currentChallenge
                    .userMents.forEach((ment) => {
                    ments.push(ment.ment);
                });
                const responseChallenge = {
                    id: challenge.id,
                    situation: challenge.situation,
                    title: currentChallenge.title,
                    description: currentChallenge.description,
                    year: challenge.year,
                    month: challenge.month,
                    day: challenge.day,
                    currentStamp: challenge.currentStamp,
                    totalStamp: currentChallenge.totalStamp,
                    userMents: ments
                };
                challengeArray.push(responseChallenge);
            });
            // 최종 responseDTO
            const responseDTO = {
                status: 200,
                data: {
                    course: {
                        id: userCourse.id,
                        situation: userCourse.situation,
                        title: dummyCourse.title,
                        description: dummyCourse.description,
                        totalDays: dummyCourse.totalDays,
                        property: dummyCourse.property,
                        challenges: challengeArray,
                    },
                },
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    },
    challenges: async (token) => {
        try {
            const user = await User_1.default.findOne({ id: token });
            const courses = await Course_1.default.find();
            // user jwt 토큰으로 유저 식별
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            // 진행 중인 코스 id 찾기
            const progressCourseId = user.courses.find((course) => course.situation === 1).id;
            // 진행 중인 코스 id가 없는 경우
            if (!progressCourseId) {
                const notExistsCourseId = {
                    status: 400,
                    message: "진행 중인 코스가 없습니다.",
                };
                return notExistsCourseId;
            }
            const userCourse = user.courses[progressCourseId - 1];
            const dummyCourse = courses[progressCourseId - 1];
            const dummyChallenge = courses[progressCourseId - 1].challenges;
            let challengeArray = new Array();
            userCourse.challenges.forEach((challenge) => {
                let ments = new Array();
                const currentChallenge = courses.find((course) => course.id === progressCourseId)
                    .challenges.find((c) => c.id === challenge.id);
                currentChallenge
                    .userMents.forEach((ment) => {
                    ments.push(ment.ment);
                });
                const responseChallenge = {
                    id: challenge.id,
                    situation: challenge.situation,
                    title: currentChallenge.title,
                    description: currentChallenge.description,
                    year: challenge.year,
                    month: challenge.month,
                    day: challenge.day,
                    currentStamp: challenge.currentStamp,
                    totalStamp: currentChallenge.totalStamp,
                    userMents: ments
                };
                challengeArray.push(responseChallenge);
            });
            // 최종 responseDTO
            const responseDTO = {
                status: 200,
                data: {
                    course: {
                        id: userCourse.id,
                        situation: userCourse.situation,
                        title: dummyCourse.title,
                        description: dummyCourse.description,
                        totalDays: dummyCourse.totalDays,
                        property: dummyCourse.property,
                        challenges: challengeArray,
                    },
                },
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=challengeService.js.map