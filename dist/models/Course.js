"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    property: {
        type: String,
        required: true,
    },
    challenges: [
        {
            id: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            userMents: [
                {
                    ment: {
                        type: String,
                        required: true,
                    },
                },
            ],
            totalStamp: {
                type: Number,
                required: true,
            },
        },
    ],
});
exports.default = mongoose_1.default.model("Course", CourseSchema);
//# sourceMappingURL=Course.js.map