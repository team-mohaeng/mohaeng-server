import mongoose from "mongoose";

export interface ILike {
	user: mongoose.Types.ObjectId;
}