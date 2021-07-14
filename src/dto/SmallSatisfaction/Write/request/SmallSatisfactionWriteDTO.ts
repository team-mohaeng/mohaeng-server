import { IImage } from "../../../../interfaces/IImage";
import { IHashtag } from "../../../../interfaces/IHashtag";

export interface SmallSatisfactionWriteRequestDTO {
	content: string;
	mainImage?: IImage;
	mood: number;
	hashtags?: [IHashtag];
	isPrivate: boolean;
}