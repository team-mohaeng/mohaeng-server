"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        let deviceToken = config_1.default.deviceToken;
        let message = {
            data: {
                title: '쟈기',
                body: '쟈니..?',
            },
            token: deviceToken,
        };
        firebase_admin_1.default
            .messaging()
            .send(message)
            .then(function (response) {
            console.log('Successfully sent message: : ', response);
        })
            .catch(function (err) {
            console.log('Error Sending message!!! : ', err);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});
//# sourceMappingURL=messageController.js.map