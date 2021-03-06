define({ "api": [
  {
    "type": "post",
    "url": "/api/smallSatisfaction/write",
    "title": "소확행 작성완료",
    "version": "1.0.0",
    "name": "SmallSatisfactionWrite",
    "group": "소확행",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "form-data 형식\nKEY(Text): smallSatisfaction, \nVALUE : {\"content\": \"오늘 아무생각없이 그림을 그렸는데 생각보다 마음에 든다!\", \"mood\": 2, \"isPrivate\": false},\nCONTENT-TYPE: application/json\n\nKEY(File): mainImage,\nVALUE: 이미지파일",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mainImageUrl",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"image\" : mainImageUrl\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 해시태그 5개 이상\n{\n \"status\": 400,\n \"message\": \"해시태그는 5개까지만 넣어주세요!\"\n}\n\n400 해시태그 6글자수 제한\n{\n \"status\": 400,\n \"message\": \"해시태그는 6글자 이내로 작성해주세요!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfaction.ts",
    "groupTitle": "소확행"
  },
  {
    "type": "get",
    "url": "/api/smallSatisfaction/community/:sort",
    "title": "커뮤니티 소확행 글 조회",
    "version": "1.0.0",
    "name": "smallSatisfactionCommunity",
    "group": "소확행",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hasSmallSatisfaction",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userCount",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "community",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n   \"status\": 200,\n   \"data\": {\n     \"hasSmallSatisfaction\": 2,\n     \"userCount\": 64,\n     \"community\": [\n       {\n         \"postId\": 1,\n         \"nickname\": \"시원스쿨\",\n         \"mood\": 2,\n         \"mainImage\": \"mainImageUrl\",\n         \"hashtags\": [\"#해시태그1\", \"#해시태그2\", ... ],\n         \"content\": \"맛있는 피자에 시원한 맥주 ... \",\n         \"likeCount\": 72,\n         \"hasLike\": true,\n         \"year\": \"2021\",\n         \"month\": \"7\",\n         \"day\": \"13\",\n         \"week\": \"화\"\n       },\n       {\n         \"postId\": 1,\n         \"nickname\": \"시원스쿨\",\n         \"mood\": 2,\n         \"mainImage\": \"mainImageUrl\",\n         \"hashtags\": [\"#해시태그1\", \"#해시태그2\", ... ],\n         \"content\": \"맛있는 피자에 시원한 맥주 ... \",\n         \"likeCount\": 72,\n         \"hasLike\": true,\n         \"year\": \"2021\",\n         \"month\": \"7\",\n         \"day\": \"13\",\n         \"week\": \"화\"\n       },\n      ...\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 유저가 유효하지 않은 경우\n{\n \"status\": 404,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfaction.ts",
    "groupTitle": "소확행"
  },
  {
    "type": "get",
    "url": "/api/smallSatisfaction/detail/:postId",
    "title": "소확행 상세보기 조회",
    "version": "1.0.0",
    "name": "smallSatisfactionDetail",
    "group": "소확행",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "postId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mainImage",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "mood",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "hashtags",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeCount",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "hasLike",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "week",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"nickname\": \"시원스쿨\",\n   \"postId\": 4,\n   \"mainImage\": \"mainImageUrl\",\n   \"mood\": 2,\n   \"hashtags\": [\"#맥주\", \"#여름\"],\n   \"content\": \"맛있는 피자에 시원한 맥주 ...\",\n   \"likeCount\": 72,\n   \"hasLike\": false,\n   \"year\": \"2021\",\n   \"month\": \"6\",\n   \"day\": \"29\",\n   \"week\": \"화\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 유저가 유효하지 않은 경우\n{\n \"status\": 404,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "404 포스트가 삭제된 경우\n{\n \"status\": 404,\n \"message\": \"글을 불러올 수 없습니다!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfaction.ts",
    "groupTitle": "소확행"
  },
  {
    "type": "put",
    "url": "/api/smallSatisfaction/like/:postId",
    "title": "소확행 좋아요",
    "version": "1.0.0",
    "name": "smallSatisfactionLike",
    "group": "소확행",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"좋아요 성공!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 유저가 유효하지 않은 경우\n{\n \"status\": 404,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "404 포스트가 삭제된 경우\n{\n \"status\": 404,\n \"message\": \"글을 불러올 수 없습니다!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfaction.ts",
    "groupTitle": "소확행"
  },
  {
    "type": "get",
    "url": "/api/smallSatisfaction/myDrawer/:year/:month",
    "title": "내서랍장 소확행 글 조회",
    "version": "1.0.0",
    "name": "smallSatisfactionMyDrawer",
    "group": "소확행",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "myDrawerSmallSatisfactions",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n   \"status\": 200,\n   \"data\": {\n     \"myDrawerSmallSatisfactions\": [\n       {\n         \"postId\": 1,\n         \"nickname\": \"시원스쿨\",\n         \"mood\": 2,\n         \"mainImage\": \"mainImageUrl\",\n         \"hashtags\": [\"#해시태그1\", \"#해시태그2\", ... ],\n         \"content\": \"맛있는 피자에 시원한 맥주 ... \",\n         \"likeCount\": 72,\n         \"hasLike\": true,\n         \"year\": \"2021\",\n         \"month\": \"7\",\n         \"day\": \"11\",\n         \"week\": \"일\"\n       },\n       {\n         \"postId\": 1,\n         \"nickname\": \"시원스쿨\",\n         \"mood\": 2,\n         \"mainImage\": \"mainImageUrl\",\n         \"hashtags\": [\"#해시태그1\", \"#해시태그2\", ... ],\n         \"content\": \"맛있는 피자에 시원한 맥주 ... \",\n         \"likeCount\": 72,\n         \"hasLike\": true,\n         \"year\": \"2021\", \n         \"month\": \"7\",\n         \"day\": \"11\",\n         \"week\": \"일\"\n        },\n       ...\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 유저가 유효하지 않은 경우\n{\n \"status\": 404,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfaction.ts",
    "groupTitle": "소확행"
  },
  {
    "type": "put",
    "url": "/api/smallSatisfaction/unlike/:postId",
    "title": "소확행 좋아요 취소",
    "version": "1.0.0",
    "name": "smallSatisfactionUnlike",
    "group": "소확행",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"좋아요 취소 성공!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 유저가 유효하지 않은 경우\n{\n \"status\": 404,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "404 포스트가 삭제된 경우\n{\n \"status\": 404,\n \"message\": \"글을 불러올 수 없습니다!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfaction.ts",
    "groupTitle": "소확행"
  },
  {
    "type": "delete",
    "url": "/api/smallSatisfaction/delete/:postId",
    "title": "소확행 포스트 삭제",
    "version": "1.0.0",
    "name": "smallSatisfactionUnlike",
    "group": "소확행",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\" \"포스트가 삭제되었습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 유저가 유효하지 않은 경우\n{\n \"status\": 404,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "404 포스트가 삭제된 경우\n{\n \"status\": 404,\n \"message\": \"글을 불러올 수 없습니다!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfaction.ts",
    "groupTitle": "소확행"
  },
  {
    "type": "put",
    "url": "/api/password",
    "title": "비밀번호 변경",
    "version": "1.0.0",
    "name": "ChangePassword",
    "group": "유저",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"userId\": \"test1@gmail.com\",\n \"userPw\": \"1234abcd\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"jwt\": \"jwt토큰\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 가입하지 않은 이메일\n{\n  \"status\": 404,\n  \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/password.ts",
    "groupTitle": "유저"
  },
  {
    "type": "get",
    "url": "/api/password/:userId",
    "title": "이메일 인증",
    "version": "1.0.0",
    "name": "CheckEmail",
    "group": "유저",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "number",
            "description": "<p>랜덤 인증번호</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n  \"status\": 200,\n  \"data\": {\n    \"number\": 1111\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 가입하지 않은 이메일\n{\n  \"status\": 404,\n  \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "400 이메일 전송 실패\n{\n  \"status\": 400,\n  \"message\": \"유효하지 않은 이메일입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/password.ts",
    "groupTitle": "유저"
  },
  {
    "type": "post",
    "url": "/api/signin",
    "title": "로그인",
    "version": "1.0.0",
    "name": "SignIn",
    "group": "유저",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"userId\": \"test1@gmail.com\",\n \"userPw\": \"abcd1234\",\n \"userToken\": \"fcm token\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"jwt\": \"jwt토큰\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 가입하지 않은 아이디\n{\n \"status\": 404,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/user.ts",
    "groupTitle": "유저"
  },
  {
    "type": "post",
    "url": "/api/signup",
    "title": "회원가입",
    "version": "1.0.0",
    "name": "SignUp",
    "group": "유저",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"userId\": \"test1@gmail.com\",\n \"userPw\": \"1234abcd\",\n \"nickname\": \"test1\",\n \"gender\": 0,\n \"birthYear\": 1998\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"jwt\": \"jwt토큰\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 아이디 중복\n{\n \"status\": 400,\n \"message\": \"이미 사용 중인 아이디입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/auth.ts",
    "groupTitle": "유저"
  },
  {
    "type": "get",
    "url": "/api/challenges",
    "title": "진행 중인 코스의 챌린지 지도 조회",
    "version": "1.0.0",
    "name": "GetChallenges",
    "group": "챌린지",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "courses",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenges",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"course\": {\n     \"id\": 1,\n     \"situation\": 1, // 현재 코스 진행 상태\n     \"title\": \"뽀득뽀득 세균퇴치\",\n     \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n     \"totalDays\": 6, // 코스가 총 며칠짜리 코스인지\n     \"property\": 0, // 코스 속성\n     \"challenges\": [\n       {\n         \"id\": 1,\n         \"title\": \"깨끗하게 손 씻기 3회\",\n         \"situation\": 1, // 챌린지 진행 상태\n         \"description\": \"손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.\",\n         \"successDescription\": \"당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?\",\n         \"year\": \"\", // 챌린지를 완료하면, year month day를 보냄.\n         \"month\": \"\", // 챌린지가 완료되지 않은 상태라면 year, month, day는 \"\"(빈 문자열)로 response\n         \"day\": \"\",\n         \"currentStamp\": 1, // 현재 유저 인증 횟수\n         \"totalStamp\": 2, // 인증해야할 총 횟수\n         \"userMents\": [ \n           \"손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼\",\n           \"세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋\"\n         ]\n       },\n       // ...\n     ]\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 진행 중인 코스가 없는 경우\n{\n \"status\": 400,\n \"message\": \"진행 중인 코스가 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/challenge.ts",
    "groupTitle": "챌린지"
  },
  {
    "type": "put",
    "url": "/api/challenges/:courseId/:challengeId",
    "title": "챌린지 인증하기",
    "version": "1.0.0",
    "name": "StampChallenge",
    "group": "챌린지",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenges",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"course\": {\n     \"id\": 1,\n     \"situation\": 1, // 현재 코스 진행 상태\n     \"title\": \"뽀득뽀득 세균퇴치\",\n     \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n     \"totalDays\": 6, // 코스가 총 며칠짜리 코스인지\n     \"property\": 0, // 코스 속성\n     \"challenges\": [\n       { // 오늘 완료한 챌린지가 있다면, situation이 1인 챌린지는 없다\n         \"id\": 1,\n         \"title\": \"깨끗하게 손 씻기 3회\",\n         \"situation\": 1, // 챌린지 진행 상태\n         \"description\": \"손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.\",\n         \"successDescription\": \"당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?\",\n         \"year\": \"\", // 챌린지를 완료하면, year month day를 보냄.\n         \"month\": \"\", // 챌린지가 완료되지 않은 상태라면 year, month, day는 \"\"(빈 문자열)로 response\n         \"day\": \"\",\n         \"currentStamp\": 2, // 현재 유저 인증 횟수\n         \"totalStamp\": 2, // 인증해야할 총 횟수\n         \"userMents\": [ \n           \"손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼\",\n           \"세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋\"\n         ]\n       },\n       // ...\n     ]\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 코스(챌린지) id가 유효하지 않을 경우\n{\n \"status\": 404,\n \"message\": \"해당 id의 코스(챌린지)가 존재하지 않습니다\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "400 현재 진행 중인 코스(챌린지)가 아닌 경우\n{\n \"status\": 400,\n \"message\": \"현재 진행 중인 코스(챌린지)가 아닙니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/challenge.ts",
    "groupTitle": "챌린지"
  },
  {
    "type": "get",
    "url": "/api/challenges/:courseId",
    "title": "오늘의 챌린지 조회",
    "version": "1.0.0",
    "name": "TodayChallenge",
    "group": "챌린지",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenges",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"course\": {\n     \"id\": 1,\n     \"situation\": 1, // 현재 코스 진행 상태\n     \"title\": \"뽀득뽀득 세균퇴치\",\n     \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n     \"totalDays\": 6, // 코스가 총 며칠짜리 코스인지\n     \"property\": 0, // 코스 속성\n     \"challenges\": [\n       { // 오늘 완료한 챌린지가 있다면, situation이 1인 챌린지는 없다\n         \"id\": 1,\n         \"title\": \"깨끗하게 손 씻기 3회\",\n         \"situation\": 1, // 챌린지 진행 상태\n         \"description\": \"손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.\",\n         \"successDescription\": \"당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?\",\n         \"year\": \"\", // 챌린지를 완료하면, year month day를 보냄.\n         \"month\": \"\", // 챌린지가 완료되지 않은 상태라면 year, month, day는 \"\"(빈 문자열)로 response\n         \"day\": \"\",\n         \"currentStamp\": 2, // 현재 유저 인증 횟수\n         \"totalStamp\": 2, // 인증해야할 총 횟수\n         \"userMents\": [\n           \"손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼\",\n           \"세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋\"\n         ]\n       },\n       // ...\n     ]\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 코스 id가 유효하지 않을 경우\n{\n \"status\": 404,\n \"message\": \"해당 id의 코스가 존재하지 않습니다\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "400 현재 진행 중인 코스가 아닌 경우\n{\n \"status\": 400,\n \"message\": \"현재 진행 중인 코스가 아닙니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/challenge.ts",
    "groupTitle": "챌린지"
  },
  {
    "type": "put",
    "url": "/api/courses/:id",
    "title": "코스 진행하기",
    "version": "1.0.0",
    "name": "ChoiceCourse",
    "group": "코스",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 진행하는 코스 하나만 response\n{\n \"status\": 200,\n \"data\": {\n   \"course\": {\n     \"id\": 1,\n     \"situation\": 1, // 현재 코스 진행 상태\n     \"title\": \"뽀득뽀득 세균퇴치\",\n     \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n     \"totalDays\": 6, // 코스가 총 며칠짜리 코스인지\n     \"property\": 0, // 코스 속성\n     \"challenges\": [\n       {\n         \"id\": 1,\n         \"title\": \"깨끗하게 손 씻기 3회\",\n         \"situation\": 2, // 챌린지 진행 상태\n         \"description\": \"손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.\",\n         \"successDescription\": \"당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?\",\n         \"year\": \"2021\", // 챌린지를 완료하면, year month day를 보냄.\n         \"month\": \"07\", // 챌린지가 완료되지 않은 상태라면 year, month, day는 \"\"(빈 문자열)로 response\n         \"day\": \"03\",\n         \"currentStamp\": 1, // 현재 유저 인증 횟수\n         \"totalStamp\": 2, // 인증해야할 총 횟수\n         \"userMents\": [ // 스탬프 수 길이만큼 userMents가 갑니다.\n           \"손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼\",\n           \"세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋\"\n         ]\n       },\n       // ...\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 코스 아이디 오류\n{\n \"status\": 404,\n \"message\": \"해당 id의 코스가 존재하지 않습니다\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/course.ts",
    "groupTitle": "코스"
  },
  {
    "type": "get",
    "url": "/api/courses/complete",
    "title": "완료한 코스 메달 조회",
    "version": "1.0.0",
    "name": "GetCompleteCourses",
    "group": "코스",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "courses",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenges",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 완료한 코스가 있는 경우\n{\n \"status\": 200,\n \"data\": {\n   \"totalIncreasedAffinity\": 26, // 총 증가시킨 쟈니와의 애정도\n   \"maxSuccessCount\": 2, // 최대 챌린지 연속 성공 횟수\n   \"courses\": [\n     {\n       \"id\": 1,\n       \"situation\": 2, // 현재 코스 진행 상태\n       \"title\": \"뽀득뽀득 세균퇴치\",\n       \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n       \"totalDays\": 6, // 코스가 총 며칠짜리 코스인지\n       \"property\": 0, // 코스 속성\n       \"challenges\": [\n         {\n           \"id\": 1,\n           \"title\": \"깨끗하게 손 씻기 3회\",\n           \"situation\": 2, // 챌린지 진행 상태\n           \"description\": \"손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.\",\n           \"successDescription\": \"당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?\",\n           \"year\": \"2021\", // 챌린지를 완료하면, year month day를 보냄.\n           \"month\": \"07\", // 챌린지가 완료되지 않은 상태라면 year, month, day는 \"\"(빈 문자열)로 response\n           \"day\": \"03\",\n           \"currentStamp\": 1, // 현재 유저 인증 횟수\n           \"totalStamp\": 2, // 인증해야할 총 횟수\n           \"userMents\": [ // 스탬프 수 길이만큼 userMents가 갑니다.\n             \"손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼\",\n             \"세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋\"\n           ]\n         },\n         // ...\n       ]\n     },\n     // ...\n   ]\n }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "200 완료한 코스가 없는 경우 -> 에러로 처리 필요하면 말씀해주세요\n{\n \"status\": 200,\n \"data\": {\n   \"totalIncreasedAffinity\": 26, // 총 증가시킨 쟈니와의 애정도\n   \"maxSuccessCount\": 2, // 최대 챌린지 연속 성공 횟수\n   \"courses\": []\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "403 만료된 토큰\n{\n \"status\": 403,\n \"message\": \"만료된 토큰입니다. 우리 아기 고앵이 토큰 하나 더 받아와 쪽-\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/course.ts",
    "groupTitle": "코스"
  },
  {
    "type": "get",
    "url": "/api/courses",
    "title": "코스 라이브러리 조회",
    "version": "1.0.0",
    "name": "GetCourses",
    "group": "코스",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "courses",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenges",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 진행 중인 코스는 뜨지 않고, situation 0 부터 정렬해서 response\n{\n \"status\": 200,\n \"data\": {\n   \"courses\": [\n     {\n       \"id\": 1,\n       \"situation\": 0, // 현재 코스 진행 상태\n       \"title\": \"뽀득뽀득 세균퇴치\",\n       \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n       \"totalDays\": 6, // 코스가 총 며칠짜리 코스인지\n       \"property\": 0\n       \"challenges\": [\n         {\n           \"id\": 1,\n           \"title\": \"깨끗하게 손 씻기 3회\",\n           \"situation\": 0, // 챌린지 진행 상태\n           \"description\": \"손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.\",\n           \"successDescription\": \"당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?\",\n           \"year\": \"\", // 챌린지를 완료하면, year month day를 보냄.\n           \"month\": \"\", // 챌린지가 완료되지 않은 상태라면 year, month, day는 \"\"(빈 문자열)로 response\n           \"day\": \"\",\n           \"currentStamp\": 0, // 현재 유저 인증 횟수\n           \"totalStamp\": 3, // 인증해야할 총 횟수\n           \"userMents\": [ // 스탬프 수 길이만큼 userMents가 갑니다.\n             \"손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼\",\n             \"세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋\"\n           ]\n         },\n         // ...\n       ]\n     },\n     // ...\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "403 만료된 토큰\n{\n \"status\": 403,\n \"message\": \"만료된 토큰입니다. 우리 아기 고앵이 토큰 하나 더 받아와 쪽-\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/course.ts",
    "groupTitle": "코스"
  },
  {
    "type": "get",
    "url": "/api/home",
    "title": "메인홈",
    "version": "1.0.0",
    "name": "Home",
    "group": "홈",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "situation",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "affinity",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "courses",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenges",
            "description": "<p>포함 속성은 하단 코드 참조</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 챌린지 진행 중\n{\n \"status\": 200,\n \"data\": {\n   \"situation\": 1, // 유저가 현재 코스를 진행하고 있는지 여부\n   \"affinity\": 42, // 쟈니와의 애정도\n   \"course\":\n     {\n       \"id\": 1,\n       \"situation\": 2, // 현재 코스 진행 상태\n       \"title\": \"뽀득뽀득 세균퇴치\",\n       \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n       \"totalDays\": 6, // 코스가 총 며칠짜리 코스인지\n       \"property\": 0, // 코스 속성\n       \"challenges\": [\n         {\n           \"id\": 1,\n           \"title\": \"깨끗하게 손 씻기 3회\",\n           \"situation\": 2, // 챌린지 진행 상태\n           \"description\": \"손을 씻는 것은 청결에 있어서 가장 기본적이지만 잊기 쉬운 일이쟈니. 깨끗해진 너의 손으로 쟈니를 섬세하게 다뤄줘.\",\n           \"successDescription\": \"당신은 나에게 한 송이 꽃과 같으니 광합성을 해야만 해. 잠시라도 나와 함께 햇빛을 느껴보겠어?\",\n           \"year\": \"2021\", // 챌린지를 완료하면, year month day를 보냄.\n           \"month\": \"07\", // 챌린지가 완료되지 않은 상태라면 year, month, day는 \"\"(빈 문자열)로 response\n           \"day\": \"03\",\n           \"currentStamp\": 3, // 현재 유저 인증 횟수\n           \"totalStamp\": 2, // 인증해야할 총 횟수\n           \"userMents\": [\n             \"손톱 밑에도 신경 써서 닦아야 해 세균은 집요하거든. 마치 쟈니처럼\",\n             \"세균 따위가 우리 사이를 가로막을 수는 없지. 청결해지기 위한 쟈기의 노력 덕분에 우리의 사이가 더 농밀해졌네? 찡긋\"\n           ]\n         },\n         // ...\n       ]\n     }\n }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "200 챌린지 진행 전\n{\n \"status\": 200,\n \"data\": {\n   \"situation\": 0, // 유저가 현재 코스를 진행하고 있는지 여부\n   \"affinity\": 42, // 쟈니와의 애정도\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "403 만료된 토큰\n{\n \"status\": 403,\n \"message\": \"만료된 토큰입니다. 우리 아기 고앵이 토큰 하나 더 받아와 쪽-\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/home.ts",
    "groupTitle": "홈"
  }
] });
