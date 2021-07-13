// import HomeResponseDTO, { HomeChallengeResponseDTO, HomeCourseResponseDTO } from "../dto/Home/HomeResponseDTO";
// import { IFail } from "../interfaces/IFail";
// import Course from "../models/Course";
// import User from "../models/User"
// import { SERVER_ERROR_MESSAGE } from "../constant";

// export default {
//   reHome: async (token: String) => {
//     let user, userCourse, dummyCourse;

//     const promiseOne = new Promise( async (resolve, reject) => {
//       User.findOne({ id: token })
//       .populate({
//         path: "courses",
//         populate: {
//           path: "course",
//           select: "title description totalDays property challenges.title challenges.description challenges.totalStamp challenges.userMents"
//         }
//       })
//       .then((user) => {
//         user = user;
//         userCourse = user.courses.find((course) => course.situation === 1);
//       });

//       if (!user) {
//         const notExistUser: IFail = {
//           status: 404,
//           message: "유저가 존재하지 않습니다.",
//         };
//         reject(notExistUser);
//       }

//       if (!userCourse) {
//         const notProgressUser: HomeResponseDTO = {
//           status: 200,
//           data: {
//             situation: user.situation,
//             affinity: user.affinity
//           }
//         };
//         reject(notProgressUser);
//       }

//       resolve("success");
//     });

//     const promiseTwo = new Promise ( async (resolve, reject) => {
//       dummyCourse = Course.find({ id: userCourse.id });

//       userCourse.challenges.forEach((challenge) => {
//         const dummyChallenge = dummyCourse.challenges[challenge.id - 1];

//       })
//     } )

//     const promise1 = new Promise( async (resolve, reject) => {
//       const userP = await User.findOne({ id: token });
//       if (!userP) {
//         const notExistUser: IFail = {
//           status: 404,
//           message: "유저가 존재하지 않습니다.",
//         };
//         reject(notExistUser);
//       }
//       user = userP;

//       const userCourseP = user.courses.find((course) => course.situation === 1);
//       if (!userCourseP) {
//         const notProgressUser: HomeResponseDTO = {
//           status: 200,
//           data: {
//             situation: user.situation,
//             affinity: user.affinity
//           }
//         };
//         reject(notProgressUser);
//       }
//       userCourse = userCourseP;

//       resolve("success");
//     } );

//     let userChallengeArray: Array<HomeChallengeResponseDTO> = new Array<HomeChallengeResponseDTO>();
//     const promise2 = new Promise ( async (resolve, reject) => {
//       const courseP = await Course.find();
//       const dummyCourseP = courseP.find((course) => course.id === userCourse.id);
//       dummyCourse = dummyCourseP;

//       userCourse.challenges.forEach((challenge) => {
//         const dummyChallengeP = dummyCourseP.challenges.find((c) => c.id === challenge.id);
//         let ments: Array<String> = new Array<String>();
//         dummyChallengeP.userMents.forEach((ment) => {
//           ments.push(ment.ment);
//         });

//         userChallengeArray.push({
//           id: challenge.id,
//           situation: challenge.situation,
//           title: dummyChallengeP.title,
//           description: dummyChallengeP.description,
//           year: challenge.year,
//           month: challenge.month,
//           day: challenge.day,
//           currentStamp: challenge.currentStamp,
//           totalStamp: dummyChallengeP.totalStamp,
//           userMents: ments
//         });
//       });
//       resolve("success");
//     } );

//     let response;
//     await Promise.all([promise1, promise2])
//           .then((data) => {
//             const responseDTO: HomeResponseDTO = {
//               status: 200,
//               data: {
//                 situation: user.situation,
//                 affinity: user.affinity,
//                 course: {
//                   id: userCourse.id,
//                   situation: userCourse.situation,
//                   title: dummyCourse.title,
//                   description: dummyCourse.title,
//                   totalDays: dummyCourse.totalDays,
//                   property: dummyCourse.property,
//                   challenges: userChallengeArray
//                 }
//               }
//             };
//             response = responseDTO;
//           })
//           .catch((err) => {
//             response = err;
//           });
//     return response;
//   },
//   home: async (token: String) => {
//     try {
//       let user = await User.findOne({ id: token });

//       if (!user) {
//         const notExistUser: IFail = {
//           status: 404,
//           message: "유저가 존재하지 않습니다.",
//         };
//         return notExistUser;
//       }

//       const userCourse = user.courses.find((course) => course.situation === 1);

//       if (!userCourse) {
//         const notProgressUser: HomeResponseDTO = {
//           status: 200,
//           data: {
//             situation: user.situation,
//             affinity: user.affinity
//           }
//         };
//         return notProgressUser;
//       }

//       const dummyCourseList = await Course.find();
//       const dummyCourse = dummyCourseList.find((course) => course.id === userCourse.id);

//       let userChallengeArray: Array<HomeChallengeResponseDTO> = new Array<HomeChallengeResponseDTO>();
//       userCourse.challenges.forEach((challenge) => {
//         const dummyChallenge = dummyCourse.challenges.find((c) => c.id === challenge.id);
//         let ments: Array<String> = new Array<String>();
//         dummyChallenge.userMents.forEach((ment) => {
//           ments.push(ment.ment);
//         });

//         userChallengeArray.push({
//           id: challenge.id,
//           situation: challenge.situation,
//           title: dummyChallenge.title,
//           description: dummyChallenge.description,
//           year: challenge.year,
//           month: challenge.month,
//           day: challenge.day,
//           currentStamp: challenge.currentStamp,
//           totalStamp: dummyChallenge.totalStamp,
//           userMents: ments
//         });
//       })

//       const responseDTO: HomeResponseDTO = {
//         status: 200,
//         data: {
//           situation: user.situation,
//           affinity: user.affinity,
//           course: {
//             id: userCourse.id,
//             situation: userCourse.situation,
//             title: dummyCourse.title,
//             description: dummyCourse.title,
//             totalDays: dummyCourse.totalDays,
//             property: dummyCourse.property,
//             challenges: userChallengeArray
//           }
//         }
//       };

//       return responseDTO;
//     } catch (err) {
//       console.error(err.message);
//       const serverError: IFail = {
//         status: 500,
//         message: SERVER_ERROR_MESSAGE,
//       };
//       return serverError;
//     }
//   }
// }