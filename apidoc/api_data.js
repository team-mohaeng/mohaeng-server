define({ "api": [
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
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"userId\": \"test1@gmail.com\",\n \"userPw\": \"1234abcd\"\n}",
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
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"userId\": \"test1@gmail.com\",\n \"userPw\": \"1234abcd\",\n \"nickname\": \"test1\",\n \"gender\": 0,\n \"birthYear\": 1998\n}",
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
