"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SmallSatisfactionSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    _id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    likes: [
        {
            user: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    content: {
        type: String,
        required: true,
    },
    images: [
        {
            image: {
                type: String,
            },
        },
    ],
    moodImage: {
        type: String,
    },
    moodText: {
        type: String,
    },
    hashtags: [
        {
            hashtag: {
                type: String,
            },
        },
    ],
    isPrivate: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("SmallSatisfaction", SmallSatisfactionSchema);
//# sourceMappingURL=SmallSatisfaction.js.map