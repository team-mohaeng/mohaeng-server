"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallSatisfaction_1 = __importDefault(require("../models/SmallSatisfaction"));
const User_1 = __importDefault(require("../models/User"));
const constant_1 = require("../constant");
exports.default = {
    create: async () => {
        let week = new Array("일", "월", "화", "수", "목", "금", "토");
        let today = new Date();
        let days = new Date().getDay();
        let todayYear = today.getFullYear().toString();
        let todayMonth = (today.getMonth() + 1).toString();
        let todayDay = today.getDate().toString();
        let todayWeek = week[days];
        try {
            const responseDTO = {
                status: 200,
                data: {
                    year: todayYear,
                    month: todayMonth,
                    day: todayDay,
                    week: todayWeek,
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
    },
    write: async (token, dto) => {
        let week = new Array("일", "월", "화", "수", "목", "금", "토");
        let today = new Date();
        let days = new Date().getDay();
        let todayYear = today.getFullYear().toString();
        let todayMonth = (today.getMonth() + 1).toString();
        let todayDay = today.getDate().toString();
        let todayWeek = week[days];
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
                status: 404,
                message: "유저가 존재하지 않습니다.",
            };
            return notExistUser;
        }
        try {
            const { content, mood, mainImage, hashtags, isPrivate, } = dto;
            if (content == "") {
                const notExistContent = {
                    status: 400,
                    message: "소확행 내용을 작성해주세요.",
                };
                return notExistContent;
            }
            let smallSatisfaction = new SmallSatisfaction_1.default({
                user: user._id,
                nickname: user.nickname,
                content,
                mood,
                mainImage,
                hashtags,
                isPrivate,
                year: todayYear,
                month: todayMonth,
                day: todayDay,
                week: todayWeek,
                likeCount: 0,
            });
            await smallSatisfaction.save();
            const responseDTO = {
                status: 200,
                data: {
                    image: mainImage,
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
    },
    myDrawer: async (token, year, month) => {
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
                status: 404,
                message: "유저가 존재하지 않습니다.",
            };
            return notExistUser;
        }
        try {
            let myDrawerSmallSatisfactions = await SmallSatisfaction_1.default.find({ user: user._id, year: year, month: month }, {}, {}).sort({ date: -1 });
            let myDrawers = new Array();
            myDrawerSmallSatisfactions.forEach((myDrawerSmallSatisfaction) => {
                let liked;
                if (myDrawerSmallSatisfaction.likes.filter((like) => like.user.toString() == user._id.toString())
                    .length > 0) {
                    liked = true;
                }
                else {
                    liked = false;
                }
                const responseDTO = {
                    postId: myDrawerSmallSatisfaction.postId,
                    nickname: user.nickname,
                    mood: myDrawerSmallSatisfaction.mood,
                    mainImage: myDrawerSmallSatisfaction.mainImage,
                    likeCount: myDrawerSmallSatisfaction.likes.length,
                    content: myDrawerSmallSatisfaction.content,
                    hasLike: liked,
                    hashtags: myDrawerSmallSatisfaction.hashtags,
                    year: myDrawerSmallSatisfaction.year,
                    month: myDrawerSmallSatisfaction.month,
                    day: myDrawerSmallSatisfaction.day,
                    week: myDrawerSmallSatisfaction.week,
                };
                myDrawers.push(responseDTO);
            });
            const responseDTO = {
                status: 200,
                data: {
                    myDrawerSmallSatisfactions: myDrawers
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            const serverError = {
                status: 500,
                message: constant_1.SERVER_ERROR_MESSAGE,
            };
            return serverError;
        }
    },
    community: async (token, sort) => {
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
                status: 404,
                message: "유저가 존재하지 않습니다.",
            };
            return notExistUser;
        }
        try {
            let smallSatisfactionWritten;
            let today = new Date();
            let todayYear = today.getFullYear().toString();
            let todayMonth = (today.getMonth() + 1).toString();
            let todayDay = today.getDate().toString();
            // 0:소확행 작성 가능 1: 소확행 이미 작성, 2: 코스 시작 전, 3:챌린지 성공 전(시작은 함)
            let userSmallSatisfaction = await SmallSatisfaction_1.default.findOne({ year: todayYear, month: todayMonth, day: todayDay, user: user._id });
            let userCourse = user.courses.filter((course) => course.situation == 1);
            if (userCourse.length > 0) {
                console.log(userCourse);
                let userChallenge = userCourse[0].challenges.filter((challenge) => challenge.situation == 2);
                if (userChallenge.length > 0) {
                    userChallenge.forEach((challenge) => {
                        if ((challenge.year == todayYear) && (challenge.month == todayMonth) && (challenge.day == todayDay) && (!userSmallSatisfaction)) {
                            smallSatisfactionWritten = 0;
                        }
                        if ((challenge.year == todayYear) && (challenge.month == todayMonth) && (challenge.day == todayDay) && (userSmallSatisfaction)) {
                            smallSatisfactionWritten = 1;
                        }
                    });
                }
                else {
                    smallSatisfactionWritten = 3;
                }
            }
            else {
                //course.situation != 1
                smallSatisfactionWritten = 2;
            }
            const userCount = await SmallSatisfaction_1.default.findOne({ year: todayYear, month: todayMonth, day: todayDay }).countDocuments();
            let communitySmallSatisfactions;
            if (sort === "date") {
                communitySmallSatisfactions = await SmallSatisfaction_1.default.find({ isPrivate: false }).sort({ date: -1 });
            }
            if (sort === "like") {
                communitySmallSatisfactions = await SmallSatisfaction_1.default.find({ isPrivate: false }).sort({ likeCount: -1 });
            }
            let communityPosts = new Array();
            communitySmallSatisfactions.forEach((communitySmallSatisfaction) => {
                let liked;
                if (communitySmallSatisfaction.likes.filter((like) => like.user.toString() == user._id.toString())
                    .length > 0) {
                    liked = true;
                }
                else {
                    liked = false;
                }
                const responseDTO = {
                    postId: communitySmallSatisfaction.postId,
                    nickname: communitySmallSatisfaction.nickname,
                    mood: communitySmallSatisfaction.mood,
                    mainImage: communitySmallSatisfaction.mainImage,
                    likeCount: communitySmallSatisfaction.likes.length,
                    content: communitySmallSatisfaction.content,
                    hasLike: liked,
                    hashtags: communitySmallSatisfaction.hashtags,
                    year: communitySmallSatisfaction.year,
                    month: communitySmallSatisfaction.month,
                    day: communitySmallSatisfaction.day,
                    week: communitySmallSatisfaction.week,
                };
                communityPosts.push(responseDTO);
            });
            const responseDTO = {
                status: 200,
                data: {
                    hasSmallSatisfaction: smallSatisfactionWritten,
                    userCount: userCount,
                    community: communityPosts
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
    },
    detail: async (token, postId) => {
        let postNumber = parseInt(postId);
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
                status: 404,
                message: "유저가 존재하지 않습니다.",
            };
            return notExistUser;
        }
        try {
            let detailSmallSatisfaction = await SmallSatisfaction_1.default.findOne({ postId: postNumber });
            if (!detailSmallSatisfaction) {
                const notExistSatisfaction = {
                    status: 404,
                    message: "글을 불러올 수 없습니다!",
                };
                return notExistSatisfaction;
            }
            let liked;
            if (detailSmallSatisfaction.likes.filter((like) => like.user.toString() == user._id.toString())
                .length > 0) {
                liked = true;
            }
            else {
                liked = false;
            }
            let myDrawerUser = await User_1.default.findOne({ _id: detailSmallSatisfaction.user });
            let userNickname = myDrawerUser.nickname;
            const responseDTO = {
                status: 200,
                data: {
                    postId: detailSmallSatisfaction.postId,
                    nickname: userNickname,
                    mood: detailSmallSatisfaction.mood,
                    mainImage: detailSmallSatisfaction.mainImage,
                    likeCount: detailSmallSatisfaction.likes.length,
                    content: detailSmallSatisfaction.content,
                    hasLike: liked,
                    hashtags: detailSmallSatisfaction.hashtags,
                    year: detailSmallSatisfaction.year,
                    month: detailSmallSatisfaction.month,
                    day: detailSmallSatisfaction.day,
                    week: detailSmallSatisfaction.week,
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
    },
    like: async (token, postId) => {
        try {
            let postNumber = parseInt(postId);
            const user = await User_1.default.findOne({ id: token });
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            const smallSatisfaction = await SmallSatisfaction_1.default.findOne({ postId: postNumber });
            if (!smallSatisfaction) {
                const notExistSmallSatisfaction = {
                    status: 404,
                    message: "소확행이 존재하지 않습니다.",
                };
                return notExistSmallSatisfaction;
            }
            await smallSatisfaction.likes.unshift({ user: user._id });
            await smallSatisfaction.save();
            const responseDTO = {
                status: 200,
                message: "좋아요 성공!"
            };
            return responseDTO;
        }
        catch (error) {
            console.error(error.message);
            const serverError = {
                status: 500,
                message: constant_1.SERVER_ERROR_MESSAGE,
            };
            return serverError;
        }
    },
    unlike: async (token, postId) => {
        try {
            let postNumber = parseInt(postId);
            const user = await User_1.default.findOne({ id: token });
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            const smallSatisfaction = await SmallSatisfaction_1.default.findOne({ postId: postNumber });
            if (!smallSatisfaction) {
                const notExistSmallSatisfaction = {
                    status: 404,
                    message: "소확행이 존재하지 않습니다.",
                };
                return notExistSmallSatisfaction;
            }
            const removeIndex = smallSatisfaction.likes
                .map((like) => like.user)
                .indexOf(user._id);
            smallSatisfaction.likes.splice(removeIndex, 1);
            await smallSatisfaction.save();
            const responseDTO = {
                status: 200,
                message: "좋아요 취소 성공!"
            };
            return responseDTO;
        }
        catch (error) {
            console.error(error.message);
            const serverError = {
                status: 500,
                message: constant_1.SERVER_ERROR_MESSAGE,
            };
            return serverError;
        }
    },
    delete: async (token, postId) => {
        try {
            let postNumber = parseInt(postId);
            const user = await User_1.default.findOne({ id: token });
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            const smallSatisfaction = await SmallSatisfaction_1.default.findOne({ postId: postNumber });
            if (!smallSatisfaction) {
                const notExistSmallSatisfaction = {
                    status: 404,
                    message: "소확행이 존재하지 않습니다.",
                };
                return notExistSmallSatisfaction;
            }
            await smallSatisfaction.remove();
            const responseDTO = {
                status: 200,
                message: "포스트가 삭제되었습니다."
            };
            return responseDTO;
        }
        catch (error) {
            console.error(error.message);
            const serverError = {
                status: 500,
                message: constant_1.SERVER_ERROR_MESSAGE,
            };
            return serverError;
        }
    },
};
//# sourceMappingURL=smallSatisfactionService.js.map