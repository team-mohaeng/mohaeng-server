import mongoose from "mongoose";
import { ILike } from "./ILike";
import { IImage } from "./IImage";
import { IHashtag } from "./IHashtag";

export interface ISmallSatisfaction {
	user: mongoose.Types.ObjectId;
	likes?: [ILike];
	content: string;
	mainImage?: [IImage]; 
	subImages?: [IImage];
	moodImage: IImage; 
	moodText: string;
	hashtags?: [IHashtag]; 
	isPrivate: boolean;
	date: Date;
}