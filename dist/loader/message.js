"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// import account from "../../journey-admin.json";
let account = require("../../journey-admin.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(account),
});
//# sourceMappingURL=message.js.map