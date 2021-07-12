"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
let generateRandom = function (min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};
exports.default = {
    email: async (email) => {
        let number = generateRandom(1111, 9999);
        const mailOptions = {
            from: "journey_anjourney@naver.com",
            to: email,
            subject: `[쟈니] 인증번호를 확인하세요! code: ${number}`,
            text: `길 잃은 나의 아기고양이 안녕?
새로운 비밀번호를 설정하려면
입력창에 아래의 인증번호를 입력해주겠어?
< ${number} >

궁금한 사항이 있으시면 쟈니 공식 메일 journey_anjourney@naver.com 로 문의 주시길 바랍니다.
감사합니다!
`
        };
        const result = await config_1.smtpTransport.sendMail(mailOptions, (err, res) => {
            if (err) {
                number = null;
                console.error(err.message);
            }
            config_1.smtpTransport.close();
        });
        return number;
    }
};
//# sourceMappingURL=password.js.map