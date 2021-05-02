import { invert } from "src/app/global/utils/objects/invert";

export interface StepStringArgs {
  MYCLAIMS: string;
  DOCS: string;
  FORMS: string;
  REVIEW: string;
}

export interface StepBooleanArgs {
  MYCLAIMS: boolean;
  DOCS: boolean;
  FORMS: boolean;
  REVIEW: boolean;
}

export class StepConstants {
  // The values here represent the StepStringArgs keys. If you change a value, the StepStringArgs and implemnting objects
  // keys below must be changed
  static MYCLAIMS: string = "MYCLAIMS";
  static DOCS: string = "DOCS";
  static FORMS: string = "FORMS";
  static REVIEW: string = "REVIEW";

  // Values are the backend step keys
  static pageValues: StepStringArgs = {
    MYCLAIMS: "myclaims",
    DOCS: "docs",
    FORMS: "forms",
    REVIEW: "pay",
  };

  static routesForPage: StepStringArgs = {
    MYCLAIMS: "/dashboard/myclaims",
    DOCS: "/dashboard/claim/documents",
    FORMS: "/dashboard/claim/forms",
    REVIEW: "/dashboard/claim/review",
  };

  static pageNames: StepStringArgs = {
    MYCLAIMS: "My Claims",
    DOCS: "Upload Documents",
    FORMS: "E-sign",
    REVIEW: "Final Review",
  };

  // To show incomplete profile modal on navigation or not
  static readonly modalOnNavigation: StepBooleanArgs = {
    MYCLAIMS: true,
    DOCS: false,
    FORMS: false,
    REVIEW: false,
  };

  static pageKeysByBackendKeys = invert(StepConstants.pageValues);
}
