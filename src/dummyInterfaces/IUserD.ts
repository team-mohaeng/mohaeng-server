import { IMessageD } from "./IMessageD";
import { IUserCourseD } from "./IUserCourseD";
import { IUserSuccessChallenge } from "../interfaces/IUserSurccessChallenge";

export interface IUserD {
  id?: string; // fcm token
	userId: string;
	userPw: string;
	nickname: string;
	gender: number;
	birthYear: number;
	situation: number;	// default 0
	affinity: number; // default 0
	success: IUserSuccessChallenge;
	messages?: IMessageD[];
	courses?: IUserCourseD[];
}