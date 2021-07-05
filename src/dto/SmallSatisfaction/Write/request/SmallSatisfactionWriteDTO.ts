import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export interface SmallSatisfactionWriteRequestDTO {
	content: string;
	mainImage?: IImage;
	subImages?: [IImage];
	moodImage: IImage;
	moodText: string;
	hashtags?: [IHashtag]; //바꾼거
	isPrivate: boolean;
}