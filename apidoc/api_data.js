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
