import mongoose from "mongoose";
import { ILike } from "./ILike";
import { IImage } from "./IImage";
import { IHashtag } from "./IHashtag";

export interface ISmallSatisfaction {
	user: mongoose.Types.ObjectId;
	_id: mongoose.Types.ObjectId;
	postId: number;
	likes?: [ILike]; // 배열이 비었을 경우
	content: string;
	images?: [IImage];
	moodImage: string;
	moodText: string;
	hashtags?: [IHashtag];
	isPrivate: boolean;
	date: Date;
}