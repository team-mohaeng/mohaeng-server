"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userPw: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: Number,
        required: true,
    },
    birthYear: {
        type: Number,
        required: true,
    },
    situation: {
        type: Number,
        default: 0,
    },
    affinity: {
        type: Number,
        default: 20,
    },
    messages: [
        {
            jouneyMessages: [
                {
                    message: {
                        type: mongoose_1.default.Types.ObjectId,
                        required: true,
                    },
                    content: {
                        type: String,
                        required: true,
                    },
                    date: {
                        type: Date,
                        required: true,
                    },
                },
            ],
            challengeMessages: [
                {
                    message: {
                        type: mongoose_1.default.Types.ObjectId,
                        required: true,
                    },
                    content: {
                        type: String,
                        required: true,
                    },
                    date: {
                        type: Date,
                        required: true,
                    },
                },
            ],
        },
    ],
    courses: [
        {
            id: {
                type: Number,
                required: true,
            },
            situation: {
                type: Number,
                required: true,
                default: 0,
            },
            challenges: [
                {
                    day: {
                        type: Number,
                        required: true,
                    },
                    situation: {
                        type: Number,
                        required: true,
                        default: 0,
                    },
                    date: {
                        type: Date,
                    },
                    currentCounts: {
                        type: Number,
                        required: true,
                        default: 0,
                    },
                },
            ],
        },
    ],
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map