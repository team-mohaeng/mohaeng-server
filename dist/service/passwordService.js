"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    user: async (id) => {
        try {
            const user = await User_1.default.findOne({ userId: id });
            if (!user) {
                const notExistUser = {
                    status: 404,
                    message: "유저가 존재하지 않습니다.",
                };
                return notExistUser;
            }
            const response = {
                status: 200,
                message: "유저가 존재합니다.",
            };
            return response;
        }
        catch (err) {
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=passwordService.js.map