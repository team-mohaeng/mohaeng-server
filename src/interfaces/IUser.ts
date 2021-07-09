import { IMessage } from "./IMessage";
import { IUserCourse } from "./IUserCourse"
import { IUserSuccessChallenge } from "./IUserSurccessChallenge";

export interface IUser {
	id?: string; // fcm token
	userId: string;
	userPw: string;
	nickname: string;
	gender: number;
	birthYear: number;
	situation: number;	// default 0
	affinity: number; // default 0
	success: IUserSuccessChallenge;
	messages?: IMessage[];
	courses?: IUserCourse[];
}