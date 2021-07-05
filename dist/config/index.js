"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
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
<<<<<<< HEAD
=======
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    /**
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
     * That long string from mlab
     */
    mongoURI: process.env.MONGODB_URI,
    deviceToken: process.env.deviceToken,
<<<<<<< HEAD
    /**
     * Your secret sauce
     */
    awsBucket: process.env.AWS_BUCKET,
    awsS3AccessKey: process.env.AWS_ACCESS_KEY,
    awsS3SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
=======
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
};
//# sourceMappingURL=index.js.map