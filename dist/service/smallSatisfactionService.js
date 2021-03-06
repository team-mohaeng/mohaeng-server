"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallSatisfaction_1 = __importDefault(require("../models/SmallSatisfaction"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    write: async (token, dto) => {
        let today = new Date();
        let todayYear = today.getFullYear().toString();
        let todayMonth = (today.getMonth() + 1).toString();
        let todayDay = today.getDate().toString();
        let smallSatisfactionCount = await SmallSatisfaction_1.default.countDocuments();
        const user = await User_1.default.findOne({ id: token });
        if (!user) {
            const notExistUser = {
                status: 404,
                message: "유저가 존재하지 않습니다.",
            };
            return notExistUser;
        }
        try {
            const { content, moodText, moodImage, mainImage, hashtags, isPrivate, } = dto;
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
                moodText,
                moodImage,
                mainImage,
                hashtags,
                isPrivate,
                year: todayYear,
                month: todayMonth,
                day: todayDay,
                postId: smallSatisfactionCount,
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
                if (myDrawerSmallSatisfaction.likes.filter((like) => like.user.toString() === token)
                    .length > 0) {
                    liked = true;
                }
                else {
                    liked = false;
                }
                const responseDTO = {
                    postId: myDrawerSmallSatisfaction.postId,
                    nickname: user.nickname,
                    moodImage: myDrawerSmallSatisfaction.moodImage,
                    mainImage: myDrawerSmallSatisfaction.mainImage,
                    likeCount: myDrawerSmallSatisfaction.likes.length,
                    content: myDrawerSmallSatisfaction.content,
                    hasLike: liked,
                    hashtags: myDrawerSmallSatisfaction.hashtags,
                    year: myDrawerSmallSatisfaction.year,
                    month: myDrawerSmallSatisfaction.month,
                    day: myDrawerSmallSatisfaction.day,
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
            let hasSmallSatisfaction = await SmallSatisfaction_1.default.findOne({ year: todayYear, month: todayMonth, day: todayDay, user: user._id });
            user.courses.forEach((course) => {
                course.challenges.forEach((challenge) => {
                    if ((challenge.situation === 2) && (!hasSmallSatisfaction)) {
                        smallSatisfactionWritten = false;
                    }
                    else {
                        smallSatisfactionWritten = true;
                    }
                });
            });
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
                if (communitySmallSatisfaction.likes.filter((like) => like.user.toString() === token)
                    .length > 0) {
                    liked = true;
                }
                else {
                    liked = false;
                }
                const responseDTO = {
                    postId: communitySmallSatisfaction.postId,
                    nickname: communitySmallSatisfaction.nickname,
                    moodImage: communitySmallSatisfaction.moodImage,
                    mainImage: communitySmallSatisfaction.mainImage,
                    likeCount: communitySmallSatisfaction.likes.length,
                    content: communitySmallSatisfaction.content,
                    hasLike: liked,
                    hashtags: communitySmallSatisfaction.hashtags,
                    year: communitySmallSatisfaction.year,
                    month: communitySmallSatisfaction.month,
                    day: communitySmallSatisfaction.day,
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
            if (detailSmallSatisfaction.likes.filter((like) => like.user.toString() === user._id)
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
                    moodImage: detailSmallSatisfaction.moodImage,
                    mainImage: detailSmallSatisfaction.mainImage,
                    likeCount: detailSmallSatisfaction.likes.length,
                    content: detailSmallSatisfaction.content,
                    hasLike: liked,
                    hashtags: detailSmallSatisfaction.hashtags,
                    year: detailSmallSatisfaction.year,
                    month: detailSmallSatisfaction.month,
                    day: detailSmallSatisfaction.day,
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
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
            if (smallSatisfaction.likes.filter((like) => like.user.toString() == user._id.toString())
                .length > 0) {
                const alreadyLiked = {
                    status: 400,
                    message: "이미 좋아요를 눌렀습니다.",
                };
                return alreadyLiked;
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
            if (smallSatisfaction.likes.filter((like) => like.user.toString() == user._id.toString())
                .length === 0) {
                const notExsitLike = {
                    status: 400,
                    message: "좋아요를 누르지 않았습니다.",
                };
                return notExsitLike;
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
        }
    },
};
//# sourceMappingURL=smallSatisfactionService.js.map