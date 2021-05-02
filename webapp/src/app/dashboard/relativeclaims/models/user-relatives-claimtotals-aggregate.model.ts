import { AggregateTotalsAPIArgs } from "../../../global/api/interfaces/endpoints/relative-claims/aggregate-total.interface";
import { ClaimPersonTotalsModel } from "../../../global/models/claim-person-totals.model";
import { RelativeClaimsWidgetModel } from "./relative-claims-aggregate-widget.model";

export class RelativeClaimsAggregateModel {
  familyTotalsModel: RelativeClaimsWidgetModel = new RelativeClaimsWidgetModel();
  deceasedTotalsModel: RelativeClaimsWidgetModel = new RelativeClaimsWidgetModel();

  constructor(args?: AggregateTotalsAPIArgs) {
    if (typeof args === "undefined") {
      return;
    }
    let familyTotals = new ClaimPersonTotalsModel(args.familyTotals);
    let deceasedTotals = new ClaimPersonTotalsModel(args.deceasedTotals);
    this.familyTotalsModel = new RelativeClaimsWidgetModel({
      totals: familyTotals,
      inProgress: args.searchInProgress,
      hasRelatives: args.hasRelatives,
      hasDeadRelatives: args.hasDeadRelatives,
      allDeceasedQuestionsAnswered: args.all_deceased_questions_answered,
    });
    this.deceasedTotalsModel = new RelativeClaimsWidgetModel({
      totals: deceasedTotals,
      inProgress: args.searchInProgress,
      hasRelatives: args.hasRelatives,
      hasDeadRelatives: args.hasDeadRelatives,
      allDeceasedQuestionsAnswered: args.all_deceased_questions_answered,
    });
  }
}
