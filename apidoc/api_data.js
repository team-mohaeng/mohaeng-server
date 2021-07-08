define({ "api": [
  {
    "type": "get",
    "url": "/api/courses",
    "title": "코스 라이브러리 조회 (코스 전체 조회)",
    "version": "1.0.0",
    "name": "GetCourses",
    "group": "Course",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Authorization\": \"Bearer {jwt}\"\n}",
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
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "situation",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalDays",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "property",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 조회 성공\n{\n \"status\": 200,\n \"data\": {\n     \"course\": [\n         {\n             \"id\": 2,\n             \"situation\": 0,\n             \"title\": \"뽀득뽀득 세균퇴치\",\n             \"description\": \"나 쟈니가 인간세계에 처음 도착했을 때 사람들이 청결에 대해 은근히 무심한 것이 신기했쟈니. 내가 사는 별에서는 상상도 할 수 없쟈니.\",\n             \"totalDays\": 6,\n             \"property\": \"water\"\n         },\n       // ...\n     ]\n   }\n}",
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
    "groupTitle": "Course"
  },
  {
    "type": "get",
    "url": "/api/home",
    "title": "메인홈",
    "version": "1.0.0",
    "name": "Home",
    "group": "Main",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Authorization\": \"Bearer {jwt}\"\n}",
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
            "field": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>코스 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "property",
            "description": "<p>코스 속성</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>챌린지 n일차</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 챌린지 진행 전\n{\n \"status\": 200,\n \"data\": {\n   \"situation\": 0,\n   \"affinity\": 0\n }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "200 챌린지 진행 중\n{\n \"status\": 200,\n \"data\": {\n   \"situation\": 1,\n   \"affinity\": 70,\n   \"course\": {\n     \"title\": \"뽀득뽀득 세균 퇴치\",\n     \"property\": \"water\",\n   },\n   \"challenge\": {\n     \"day\": 2\n   }\n }\n}",
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
    "groupTitle": "Main"
  },
  {
    "type": "post",
    "url": "/api/smallSatisfactionCommunity",
    "title": "커뮤니티 소확행 글 조회",
    "version": "1.0.0",
    "name": "smallSatisfactionCommunity",
    "group": "SmallSatisfaction",
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
          "content": "{\n}",
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
          "content": "200 OK\n{\n\t\"status\": 200,\n\t\"data\": {\n\t\t\t\"hasSmallSaisfacion\": false\n\t\t\t\"userCount\": 64\n\t\t\t\"smallSatisfactions\": [\n\t\t\t{\n\t\t\t\t\"postId\": 1\n\t\t\t\t\"moodImage\": \"무드 이미지.png\",\n\t\t\t\t\"hashtags\": [\"#해쉬태그1\", \"#해쉬태그2\", ... ],\n\t\t\t\t\"content\": \"맛있는 피자에 시원한 맥주 ... \",\n\t\t\t\t\"likeCount\": 72,\n\t\t\t\t\"hasImage\": false,\n\t\t\t\t\"hasLike\": true,\n\t\t\t\t\"nickname\": \"시원스쿨\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"postId\": 2\n\t\t\t\t\"moodImage\": \"무드 이미지\",\n\t\t\t\t\"hashtags\": [\"#해쉬태그1\", \"#해쉬태그2\", ... ],\n\t\t\t\t\"content\": \"맛있는 피자에 시원한 맥주 ... \",\n\t\t\t\t\"likeCount\": 72,\n\t\t\t\t\"hasImage\": false,\n\t\t\t\t\"hasLike\": true,\n\t\t\t\t\"nickname\": \"시원스쿨\"\n\t\t\t},\n\t\t...\n\t\t]\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 400,\n \"message\": \"서버 에러입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/smallSatisfactionCommunity.ts",
    "groupTitle": "SmallSatisfaction"
  },
  {
    "type": "post",
    "url": "/api/writeSmallSatisfaction",
    "title": "소확행 작성",
    "version": "1.0.0",
    "name": "writeSmallSatisfaction",
    "group": "SmallSatisfaction",
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
          "content": "{\n\t\"moodImage\": \"moodUrl\",\n\t\"moodText\": \"그저 그런 하루\",\n\t\"content\": \"소확행 내용\",\n\t\"hashtags\": [\"#해시태그1\", \"#해시태그2\", ... ],\n\t\"mainImage\": \"mainImageUrl\",\n\t\"isPrivate\": false \n    }",
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
    "filename": "src/api/writeSmallSatisfaction.ts",
    "groupTitle": "SmallSatisfaction"
  },
  {
    "type": "post",
    "url": "/api/signin",
    "title": "로그인",
    "version": "1.0.0",
    "name": "SignIn",
    "group": "User",
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
          "content": "{\n \"userId\": \"test1@gmail.com\",\n \"userPw\": \"1234abcd\",\n \"userToken\": \"fcm token\"\n}",
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
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/signup",
    "title": "회원가입",
    "version": "1.0.0",
    "name": "SignUp",
    "group": "User",
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
    "groupTitle": "User"
  }
] });
