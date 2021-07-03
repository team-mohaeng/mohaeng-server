"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log("Mongoose Connected ...");
        // User.createCollection().then(function(collection) {
        //   console.log('User Collection is created!');
        // });
        // Course.createCollection().then(function(collection) {
        //   console.log('Course Collection is created!');
        // });
        // SmallSatisfaction.createCollection().then(function(collection) {
        //   console.log('Course Collection is created!');
        // });
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map