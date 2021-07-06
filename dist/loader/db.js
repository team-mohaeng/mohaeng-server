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
        // Course.insertMany([
        //   {
        //     "id": 1,
        //     "title": "뽀득뽀득 세균퇴치",
        //     "description": "나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.",
        //     "totalDays": 6,
        //     "property": "water",
        //     "challenges": [
        //       {
        //         "day": 1,
        //         "description": "손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.",
        //         "userMents": [
        //           {
        //             "ment": "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
        //           },
        //           {
        //             "ment": "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋",
        //           }
        //         ],
        //         "totalCounts": 3
        //       },
        //       {
        //         "day": 2,
        //         "description": "그거 알아? 샤워할 때 귀 뒤쪽을 잘 씻지 않으면 베개에서 정수리 냄새가 난다는걸...? 당신 냄새는 다 좋지만, 난 쟈기가 향기롭게 잠에 들길 바래.",
        //         "userMents": [
        //           {
        //             "ment": "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
        //           },
        //           {
        //             "ment": "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋",
        //           }
        //         ],
        //         "totalCounts": 1
        //       },
        //       {
        //         "day": 3,
        //         "description": "자기 전 가글을 하면 입냄새가 사라진다는 거 알아...? 쟈니는 아침에 당신의 숨결에서 느껴지는 민트향을 맡고 싶어...",
        //         "userMents": [
        //           {
        //             "ment": "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
        //           },
        //           {
        //             "ment": "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋",
        //           }
        //         ],
        //         "totalCounts": 1
        //       },
        //       {
        //         "day": 4,
        //         "description": "자기 전 가글을 하면 입냄새가 사라진다는 거 알아...? 쟈니는 아침에 당신의 숨결에서 느껴지는 민트향을 맡고 싶어...",
        //         "userMents": [
        //           {
        //             "ment": "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
        //           },
        //           {
        //             "ment": "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋",
        //           }
        //         ],
        //         "totalCounts": 1
        //       },
        //       {
        //         "day": 5,
        //         "description": "쟈기의 손길이 가장 많이 닿는 그것... 질투나지만 막을 수 없다면 세균으로부터 쟈기를 지키겠어.",
        //         "userMents": [
        //           {
        //             "ment": "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
        //           },
        //           {
        //             "ment": "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋",
        //           }
        //         ],
        //         "totalCounts": 1
        //       },
        //       {
        //         "day": 6,
        //         "description": "당신의 온몸 구석구석 놓치고 싶지 않아.",
        //         "userMents": [
        //           {
        //             "ment": "손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼",
        //           },
        //           {
        //             "ment": "세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋",
        //           }
        //         ],
        //         "totalCounts": 1
        //       }
        //     ]
        //   }
        // ]).then(function(collection) {
        //   console.log("Data Insert Success.");
        // });
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map