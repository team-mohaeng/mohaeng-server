"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtpTransport = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    /**
     * That long string from mlab
     */
    mongoURI: process.env.MONGODB_URI,
    deviceToken: process.env.deviceToken,
    /**
     * Your secret sauce
     */
    awsBucket: process.env.AWS_BUCKET,
    awsS3AccessKey: process.env.AWS_ACCESS_KEY,
    awsS3SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
exports.smtpTransport = nodemailer_1.default.createTransport({
    service: "Naver",
    host: "smtp.naver.com",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW,
    },
    tls: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=index.js.map