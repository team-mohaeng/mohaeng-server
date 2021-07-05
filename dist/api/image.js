"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../modules/upload"));
const router = express_1.default.Router();
router.post("/", upload_1.default.array('img', 5), async (req, res) => {
    /*
    if (!(req as any).files) {
      res.send({
        msg: "사용자가 이미지를 추가하지 않았습니다!",
      })
    }
    */
    if (req.files) {
        const images = req.files;
        const imgUrl = [];
        if (images.length > 5) {
            return res.status(404).json({ msg: "사진이 5장을 초과했습니다!" });
        }
        for (let i = 0; i < images.length; i++) {
            imgUrl.push(images[i].location);
        }
        res.send({
            img: imgUrl,
        });
    }
    //서비스코드 작성
});
module.exports = router;
//# sourceMappingURL=image.js.map