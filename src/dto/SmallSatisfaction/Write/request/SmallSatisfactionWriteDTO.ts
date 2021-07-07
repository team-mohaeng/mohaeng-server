import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export interface SmallSatisfactionWriteRequestDTO {
	content: string;
	mainImage?: IImage;
	moodImage: IImage;
	moodText: string;
	hashtags?: [IHashtag];
	isPrivate: boolean;
}