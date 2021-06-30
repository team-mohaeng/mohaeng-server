import { IChallengeMessage } from "./IChallengeMessage";
import { IJourneyMessage } from "./IJourneyMessage";

export interface IMessage {
  journeyMessages: [IJourneyMessage];
  challengeMessages: [IChallengeMessage];
}