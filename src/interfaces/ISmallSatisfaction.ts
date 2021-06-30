import mongoose from "mongoose";
import { ILike } from "./ILike";

export interface ISmallSatisfaction {
	user: mongoose.Types.ObjectId;
	_id: mongoose.Types.ObjectId;
	postId: number;
	likes?: [ILike]; // 배열이 비었을 경우
	content: string;
	images?: [string];
	moodImage: string;
	moodText: string;
	hashtags?: [string];
	isPrivate: boolean;
	date: Date;
}