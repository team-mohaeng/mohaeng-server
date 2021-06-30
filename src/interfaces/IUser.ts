import { IMessage } from "./IMessage";
import { IUserCourse } from "./IUserCourse"

export interface IUser {
	id: string; // fcm token
	userId: string;
	userPw: string;
	nickname: string;
	affinity: number; // default 0
	messages?: [IMessage];
	courses: [IUserCourse];
}