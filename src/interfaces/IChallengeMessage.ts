import mongoose from "mongoose";

export interface IChallengeMessage {
	_id: mongoose.Types.ObjectId;
	content: string;
	date: Date;
}