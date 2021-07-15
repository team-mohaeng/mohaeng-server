"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_auto_increment_1 = __importDefault(require("mongoose-auto-increment"));
mongoose_1.default.set('useFindAndModify', false);
const SmallSatisfactionSchema = new mongoose_1.default.Schema({
    user: {
        //_id user object id 값이 들어옴
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    nickname: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    likeCount: {
        type: Number,
        required: true,
        default: 0,
    },
    postId: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    mood: {
        type: Number,
        required: true,
    },
    mainImage: {
        type: String,
    },
    hashtags: {
        type: [String],
    },
    isPrivate: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    week: {
        type: String,
        required: true,
    }
});
mongoose_auto_increment_1.default.initialize(mongoose_1.default.connection);
SmallSatisfactionSchema.plugin(mongoose_auto_increment_1.default.plugin, {
    model: 'smallSatisfaction',
    field: 'postId',
    startAt: 1,
    increment: 1
});
exports.default = mongoose_1.default.model("SmallSatisfaction", SmallSatisfactionSchema);
//# sourceMappingURL=SmallSatisfaction.js.map