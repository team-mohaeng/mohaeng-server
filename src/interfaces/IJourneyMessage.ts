import mongoose from "mongoose";

export interface IJourneyMessage {
  _id: mongoose.Types.ObjectId,
	content: string,
	date: Date
}