import { Component, OnInit } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";
import { EventTrackerService } from "../../../global/services/event-tracker/event-tracker.service";
import { UploadService } from "./upload.service";
import { Document } from "../../../global/models/document.model";
import { ClaimsBarService } from "../../claimsbar/claimsbar.service";
import { UploadPageModel } from "./upload.model";
import { RequiredDocRowModel } from "./requiredsection/requireddocrow.model";
import { StepConstants } from "../../step/stepconstants";
import { LoadingService } from "src/app/global/services/loading.service";
import { CFError } from "src/app/global/error.service";
import { ErrorBarService } from "../../../global/services/error-bar.service";
declare let env: any;

/**
 * This is the main page component for the Upload Documents page.
 *
 * It is organized as a nested set of components:
 * * [RequiredSectionComponent]{@link RequiredSectionComponent}
 *     * [RequiredRowComponent]{@link RequiredRowComponent}
 * * [PromptSectionComponent]{@link PromptSectionComponent}
 *     * [PromptBoxComponent]{@link PromptBoxComponent}
 *         * [AddressToolTipComponent]{@link AddressToolTipComponent}
 * * [UploadSectionComponent]{@link UploadSectionComponent}
 *     * [UploadBoxComponent]{@link UploadBoxComponent}
 *         * [UploadBoxRowComponent]{@link UploadBoxRowComponent}
 */
@Component({
  selector: "cf-upload",
  templateUrl: "./upload.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./upload.component.scss",
  ],
})
export class UploadComponent implements OnInit {
  dispRequired: boolean = false;
  dispUploaded: boolean = false;

  public model: UploadPageModel;
  public uploadedDocs: Document[];
  public requiredDocs: Document[];
  public rowModels: RequiredDocRowModel[];
  pageName = StepConstants.DOCS;
  // This is to not allow user to upload multiple docs for same requirement
  public docsBeingUploaded: object = {};
  constructor(
    private docService: UploadService,
    private logger: LoggerService,
    private claimsBarService: ClaimsBarService,
    private eventTrackerService: EventTrackerService,
    private loadingService: LoadingService,
    private errorBarService: ErrorBarService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.docService.getDocs().subscribe(
      (result) => this.updateModel(result),
      (error: CFError) => this.handleReceiveError(error)
    );
  }

  onUpload(docNum: number): void {
    let doc: Document;
    let claimsList: string[];
    [doc] = this.requiredDocs.splice(docNum, 1);
    claimsList = doc.forClaims;

    this.rowModels.forEach((row) => {
      row.setDocumentUploadInProgress(claimsList);
    });

    this.addNewDocToDb(doc);

    this.setDisplay();
  }

  onUpdate() {
    this.docService.getDocs().subscribe(
      (result) => this.onUpdateResult(result),
      (error: CFError) => this.handleReceiveError(error)
    );
  }

  deleteUploadedDoc(num: number): void {
    this.rowModels.forEach((row) => {
      row.documentUploadInProgress = true;
    });

    this.deleteDocFromDb(this.uploadedDocs[num]);

    this.setDisplay();
  }

  addNewDocToDb(doc: Document): void {
    this.docService.addDoc(doc).subscribe(
      (result: UploadPageModel) => this._addNewDocToDbSuccess(result, doc),
      (error: CFError) => this.handleSubmitError(error, doc)
    );
  }

  private _addNewDocToDbSuccess(result: UploadPageModel, doc: Document): void {
    this.updateModel(result);
    this.claimsBarService.refreshClaimsBar();

    this.docsBeingUploaded[doc.docType + doc.references] = false;

    result.claimDocumentRequirements.forEach((row) => {
      if (row.documentUploadInProgress) {
        row.documentUploadInProgress = false;
      }
    });

    if (env.CF_ANALYTICS_FE) {
      let email = JSON.stringify(localStorage["cf-email-sent"]);

      this.eventTrackerService.triggerEvent("documentUpload", {
        email: email,
        docType: doc.docType,
        fileType: doc.fileType,
      });
    }

    //Removing any earlier error messages that may be hanging around
    this.errorBarService.clearNonFormErrorMessages("uploadDocsErrorBar");
  }

  deleteDocFromDb(doc: Document): void {
    this.docService.removeDoc(doc).subscribe(
      (result) => this._deleteDocFromDbSuccess(result, doc),
      (error) => this.handleSubmitError(error, doc)
    );
  }

  private _deleteDocFromDbSuccess(
    result: UploadPageModel,
    doc: Document
  ): void {
    this.updateModel(result);
    this.claimsBarService.refreshClaimsBar();

    result.claimDocumentRequirements.forEach((row) => {
      if (row.documentUploadInProgress) {
        row.documentUploadInProgress = false;
      }
    });

    if (env.CF_ANALYTICS_FE) {
      let email = JSON.stringify(localStorage["cf-email-sent"]);

      this.eventTrackerService.triggerEvent("deleteDocument", {
        email: email,
        docType: doc.docType,
        fileType: doc.fileType,
      });
    }
  }

  handleReceiveError(error: CFError): void {
    // TODO: add error handling
    this.logger.error("Error getting documents:" + error.toString());
  }

  handleSubmitError(error: CFError, doc: Document) {
    this.docsBeingUploaded[doc.docType + doc.references] = false;
    this.errorBarService.pushCFErrorEvent({ uploadDocsErrorBar: error });

    //need to make sure prompt box and spinners displays correct set of docs so required docs needs to be updated
    this.docService.getDocs().subscribe(
      (result) => this.updateModel(result),
      (error: CFError) => this.handleReceiveError(error)
    );
  }

  updateModel(results: UploadPageModel): void {
    this.model = results;
    this.rowModels = results.claimDocumentRequirements;
    this.requiredDocs = results.requiredDocs;
    this.uploadedDocs = results.uploadedDocs;
    this.setDisplay();
    this.loadingService.setLoading(false);
  }

  onUpdateResult(results: UploadPageModel) {
    this.updateModel(results);
    this.claimsBarService.refreshClaimsBar();
  }

  setDisplay(): void {
    this.dispUploaded = this.uploadedDocs.length > 0;
    this.dispRequired = this.requiredDocs.length > 0;
  }
}
