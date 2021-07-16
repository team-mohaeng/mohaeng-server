# ![쟈니 앱아이콘](https://user-images.githubusercontent.com/49138331/125876222-8358a101-b852-4a58-a4aa-bbe3c9ce66c8.png) 쟈니

![쟈니보드흰버전](https://user-images.githubusercontent.com/49138331/125876211-024c6a84-22fd-4143-9e20-ca46efda386d.png)

<center style="bold">
	<b>잃어버린 당신의 일상을 깨워줄 행복 메이트, 쟈니(Journey)</b><br/>
  <b>개발 기간: 2021.06.27 ~</b>
</center>



# 서비스 워크플로우



# 서버 아키텍처

![서버 아키텍처](https://user-images.githubusercontent.com/49138331/125880291-768fa07e-1ba9-4a43-849d-f4bdc3dac841.png)





# 기능 분담

| 김현지                                                       | 김기연                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 🆗 메인 홈 조회<br />🆗 회원가입<br />🆗 로그인<br />🆗 비밀번호 변경<br />🆗 이메일로 인증번호 전송<br />🆗 전체 코스 조회<br />🆗 코스 진행하기<br />🆗 완료된 코스 조회<br />🆗 오늘의 챌린지 조회<br />🆗 챌린지 진행하기<br />🆗 진행 중인 코스 중 챌린지 진행상황 조회<br />🆗 ec2 환경설정<br />⏯ 푸시 알림 | 🆗 소확행 작성하기<br />🆗 소확행 커뮤니티 조회<br />🆗 내 소확행 조회<br />🆗 소확행 내용 상세보기<br />🆗 소확행 삭제<br />🆗 소확행 좋아요/취소<br />🆗 s3 환경설정 |



# API 명세서

[쟈기, 우리가 짠 API 보러갈래? 💋]("http://3.36.55.247:5000/apidoc")



# 의존성

```json
"dependencies": {
  "aws-sdk": "^2.938.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^10.0.0",
  "express": "^4.17.1",
  "express-validator": "^6.12.0",
  "jsonwebtoken": "^8.5.1",
  "mongoose": "^5.13.0",
  "mongoose-auto-increment": "^5.0.1",
  "multer": "^1.4.2",
  "multer-s3": "^2.9.0",
  "package.json": "^2.0.1"
},
"devDependencies": {
  "@types/bcryptjs": "^2.4.2",
  "@types/express": "^4.17.12",
  "@types/mongoose": "^5.11.97",
  "@types/node": "^15.12.5",
  "firebase-admin": "^9.10.0",
  "nodemailer": "^6.6.2",
  "nodemon": "^2.0.9",
  "ts-node": "^10.0.0",
  "typescript": "^4.3.4"
}
```



# Contributor 🖤

| [김현지](https://github.com/khyunjiee)                      | [김기연](https://github.com/gamza55) |
| ------------------------------------ | ------------------------------------ |
| 더 잘해주지 못해서 미안하고,, 항상 고맙습니다 우리 기연이 🖤 | 수정해주세요 🖤                       |



## RULE

[Coding Convention](https://github.com/team-journey/journey-server/blob/develop/rules/Coding%20Convention.md)

[Commit Convention](https://github.com/team-journey/journey-server/blob/develop/rules/Commit%20Convention.md)

[Git Rule](https://github.com/team-journey/journey-server/blob/develop/rules/Git%20Rule.md)

