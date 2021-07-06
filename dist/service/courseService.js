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
            let courses = await Course_1.default.find({}, { "_id": 0, "challenges": 0, "__v": 0 });
            let progressCourseId;
            if (!user) {
                const notExistUser = {
                    status: 400,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            user.courses.forEach((course) => {
                if (course.situation == 1)
                    progressCourseId = course.situation;
            });
            courses = courses.filter((course) => course.id != progressCourseId);
            let responseCourse = new Array();
            courses.forEach((course) => {
                const responseDTO = {
                    id: course.id,
                    situation: 0,
                    title: course.title,
                    description: course.description,
                    totalDays: course.totalDays,
                    property: course.property
                };
                responseCourse.push(responseDTO);
            });
            responseCourse = responseCourse.sort((a, b) => (a.situation > b.situation) ? -1 : Number(a.situation > b.situation));
            const responseDTO = {
                status: 200,
                data: {
                    course: responseCourse,
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