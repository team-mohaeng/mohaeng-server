import mongoose from "mongoose";
import { ILike } from "../interfaces/ILike";
import { IImage } from "../interfaces/IImage";
import { IHashtag } from "../interfaces/IHashtag";

export interface ISmallSatisfactionD {
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
  week: string;
}