import { MatchingInProgressAPIArgs } from "../../interfaces/endpoints/matching/matchinginprogress.interface";

export class MatchingInProgressModel {
  matchingComplete: boolean;

  constructor(args: MatchingInProgressAPIArgs) {
    this.matchingComplete = args.is_completed;
  }
}
