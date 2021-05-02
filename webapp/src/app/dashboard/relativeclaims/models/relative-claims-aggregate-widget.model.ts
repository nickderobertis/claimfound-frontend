import { ClaimPersonTotalsModel } from "../../../global/models/claim-person-totals.model";

export class RelativeClaimsWidgetModel {
  aggregateClaimsTotalModel: ClaimPersonTotalsModel = new ClaimPersonTotalsModel();
  searchesInProgress: boolean = false;
  hasRelatives: boolean = false;
  hasDeadRelatives: boolean = false;
  allDeceasedQuestionsAnswered = false;

  constructor(args?: RelativeClaimsWidgetArgs) {
    if (typeof args === "undefined") {
      return;
    }
    this.aggregateClaimsTotalModel = args.totals;
    this.hasRelatives = args.hasRelatives;
    this.hasDeadRelatives = args.hasDeadRelatives;
    this.searchesInProgress = args.inProgress;
    this.allDeceasedQuestionsAnswered = args.allDeceasedQuestionsAnswered;
  }
}

export interface RelativeClaimsWidgetArgs {
  totals: ClaimPersonTotalsModel;
  inProgress: boolean;
  hasRelatives: boolean;
  hasDeadRelatives: boolean;
  allDeceasedQuestionsAnswered: boolean;
}
