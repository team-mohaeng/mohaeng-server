import { IJourneyMessageD } from "./IJourneyMessageD";
import { IChallengeMessageD } from "./IChallengeMessageD";

export interface IMessageD {
  journeyMessages: [IJourneyMessageD];
  challengeMessages: [IChallengeMessageD];
}