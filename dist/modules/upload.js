"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const config_1 = __importDefault(require("../config"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: config_1.default.awsS3AccessKey,
    secretAccessKey: config_1.default.awsS3SecretAccessKey
});
const upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: config_1.default.awsBucket,
        acl: 'public-read',
        key: function (req, file, cb) {
            //위치, 파일명 설정
            cb(null, 'images/origin/' + Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});
exports.default = upload;
//# sourceMappingURL=upload.js.map