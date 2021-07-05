"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const constant_1 = require("../constant");
exports.default = (req, res, next) => {
    // Get token from header
    const token = req.header("Bearer");
    // Check if not token
    if (!token) {
        return res.status(403).json({
            status: 403,
            message: constant_1.TOKEN_ERROR_MESSAGE
        });
    }
    // Verify token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.body.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(403).json({
            status: 403,
            message: constant_1.TOKEN_ERROR_MESSAGE
        });
    }
};
//# sourceMappingURL=auth.js.map