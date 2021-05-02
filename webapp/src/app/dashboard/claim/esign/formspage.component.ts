import { Component } from "@angular/core";
import { FormsPageService } from "./formspage.service";
import { LoggerService } from "src/app/global/logger.service";
import { FormsPageModel } from "./models/formspage.model";
import { CFError } from "src/app/global/error.service";
import { StepConstants } from "../../step/stepconstants";
import { ClaimsBarService } from "../../claimsbar/claimsbar.service";
import { StorageService } from "src/app/global/storage.service";
import { LoadingService } from "src/app/global/services/loading.service";

/**
 * The main page component for the e-sign forms page. Here the user can view and
 * sign their forms and update any information to be filled on the forms.
 *
 * Subcomponents:
 * * [ReviewIncompleteFormsComponent]{@link ReviewIncompleteFormsComponent}
 * * [FillAndSignComponent]{@link FillAndSignComponent}
 *   * [FillAddressComponent]{@link FillAddressComponent}
 *   * [FillPhoneComponent]{@link FillPhoneComponent}
 *   * [FillSSNComponent]{@link FillSSNComponent}
 *     * [SSNPopupComponent]{@link SSNPopupComponent}
 *   * [SignatureCaptureComponent]{@link SignatureCaptureComponent}
 *     * [SignaturePadComponent]{@link SignaturePadComponent}
 */
@Component({
  selector: "forms-page",
  templateUrl: "./formspage.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./formspage.component.scss",
  ],
})
export class FormsPageComponent {
  model: FormsPageModel;
  loading: boolean = true;
  reviewCompleted: boolean = false;

  pageName: string = StepConstants.FORMS;

  constructor(
    private formsPageService: FormsPageService,
    private claimsBarService: ClaimsBarService,
    private loadingService: LoadingService,
    private logger: LoggerService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.claimsBarService.refreshClaimsBar();
    this.getForms();
  }

  getForms() {
    this.formsPageService.getForms().subscribe(
      (result: FormsPageModel) => {
        this.onGetFormsSuccess(result);
      },
      (error: CFError) => this.onGetFormsError(error)
    );
  }

  onGetFormsSuccess(result: FormsPageModel) {
    this.model = result;
    this.enableNextStepButtonIfReady();
    this.loading = false;
    this.loadingService.setLoading(false);
  }

  onGetFormsError(error: CFError) {
    this.logger.error("Error loading forms in fillandsign component ", error);
  }

  onReviewCompleted() {
    this.reviewCompleted = true;
  }

  onFormSubmit() {
    this.getForms();
  }

  enableNextStepButtonIfReady() {
    let allFormsComplete: boolean = true;
    if (this.model.incompleteForms.length === 0) {
      allFormsComplete = true;
    }
    if (allFormsComplete) {
      this.claimsBarService.refreshClaimsBar();
    }
  }

  onCompleteFormLinkClick(index: number) {
    window.open(
      this.model.completeForms[index].authenticatedUrl(this.storage, true),
      "_blank"
    );
  }
}
