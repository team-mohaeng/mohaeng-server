import { IMessage } from "./IMessage";
import { IUserCourse } from "./IUserCourse"

export interface IUser {
	id?: string; // fcm token
	userId: string;
	userPw: string;
	nickname: string;
	gender: number;
	birthYear: number;
	situation: number;	// default 0
	affinity: number; // default 0
	messages?: IMessage[];
	courses?: IUserCourse[];
}