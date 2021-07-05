"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
<<<<<<< HEAD
const dateFormatter_1 = require("../formatter/dateFormatter");
=======
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
const SmallSatisfactionSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
<<<<<<< HEAD
=======
    _id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
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
<<<<<<< HEAD
    mainImage: {
        type: String,
    },
    subImages: {
        type: [String],
    },
=======
    images: [
        {
            image: {
                type: String,
            },
        },
    ],
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
    moodImage: {
        type: String,
    },
    moodText: {
        type: String,
    },
<<<<<<< HEAD
    hashtags: {
        type: [String],
    },
=======
    hashtags: [
        {
            hashtag: {
                type: String,
            },
        },
    ],
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
    isPrivate: {
        type: Boolean,
        required: true,
    },
    date: {
<<<<<<< HEAD
        type: String,
        default: dateFormatter_1.dateFormatter(),
=======
        type: Date,
        required: true,
        default: Date.now,
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
    },
});
exports.default = mongoose_1.default.model("SmallSatisfaction", SmallSatisfactionSchema);
//# sourceMappingURL=SmallSatisfaction.js.map