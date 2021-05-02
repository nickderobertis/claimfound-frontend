import { StepConstants } from "../step/stepconstants";

export class ClaimStatusModel {
  select: boolean;
  docs: boolean;
  forms: boolean;
  review: boolean;
  submitted: boolean;
  pause: boolean;

  constructor(args?: ClaimStatusModelAPIArgs) {
    this.docs = args ? args.docs : false;
    this.forms = args ? args.forms : false;
    this.pause = args ? args.pause : false;
    this.review = args ? args.pay : false;
    this.select = args ? args.select : false;
    this.submitted = args ? args.submitted : false;
  }

  isStepOrLaterStepActive(step: string): boolean {
    if (step === StepConstants.MYCLAIMS) {
      return true;
    } else if (step === StepConstants.DOCS) {
      return this.docs || this.forms || this.review;
    } else if (step === StepConstants.FORMS) {
      return this.forms || this.review;
    } else if (step === StepConstants.REVIEW) {
      return this.review;
    } else {
      return false;
    }
  }
}

export interface ClaimStatusModelAPIArgs {
  select: boolean;
  docs: boolean;
  forms: boolean;
  pay: boolean;
  submitted: boolean;
  pause: boolean;
}
