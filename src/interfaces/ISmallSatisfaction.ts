import mongoose from "mongoose";
import { ILike } from "./ILike";
import { IImage } from "./IImage";
import { IHashtag } from "./IHashtag";

export interface ISmallSatisfaction {
	user: mongoose.Types.ObjectId;
	postId: number;
	likes?: [ILike];
	content: string;
	mainImage?: IImage; 
	moodImage: IImage; 
	moodText: string;
	hashtags?: [IHashtag]; 
	isPrivate: boolean;
	year: string;
	month: string;
	day: string;
	date: Date;
}