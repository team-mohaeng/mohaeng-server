"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    let tokens = new Array();
    const users = await User_1.default.find().select({ _id: 0, id: 1 });
    users.forEach((user) => {
        tokens.push(user.id);
    });
    res.json(tokens);
});
module.exports = router;
//# sourceMappingURL=message.js.map