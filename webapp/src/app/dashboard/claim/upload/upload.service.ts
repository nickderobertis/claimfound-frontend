import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";

import { ClaimsService } from "../../claims.service";
import { LoggerService } from "../../../global/logger.service";
import { StorageService } from "../../../global/storage.service";
import { ErrorModalService } from "../../../error-modal/errormodal.service";
import { Document } from "../../../global/models/document.model";
import { UploadPageModel } from "./upload.model";
import { DocumentsAPIArgs } from "../../../global/api/interfaces/endpoints/documents.interface";
import { TokenServiceRequestOptions } from "../../../global/base.service";
import { CFError } from "src/app/global/error.service";

/**
 * The service powering the Upload Documents page. Handles getting, adding and removing documents,
 * verifying addresses, and checking document size.
 */
@Injectable()
export class UploadService extends ClaimsService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  /**
   * Gets the currently uploaded and required documents from the backend based on
   * state requirements and the user's claims.
   */
  getDocs(): Observable<UploadPageModel> {
    let options = new TokenServiceRequestOptions({
      url: "documents",
    });

    let obs = this.postInject(this.get(options), (res: DocumentsAPIArgs) => {
      return new UploadPageModel(res);
    });

    return obs;
  }

  /**
   * Adds a document to the database for the user
   * @param doc An uploaded document model
   */
  addDoc(doc: Document): Observable<UploadPageModel> {
    let obs = this.checkDocTypeSize(doc);

    let obj = JSON.parse(JSON.stringify(doc));

    delete obj.doc;

    let files = [doc.doc];

    let result = this.postInject(
      this.postFileAndData("documents", obj, files),
      (res: DocumentsAPIArgs) => {
        return new UploadPageModel(res);
      }
    );
    return result;
  }

  /**
   * Checks whether the document is a valid file size, otherwise throws an error.
   * @param docObj An uploaded document model
   */
  checkDocTypeSize(docObj: Document) {
    let fileLimit: Number = 50 * 1024 * 1024;

    let pdfFileLimit: Number = 5 * 1024 * 1024;

    let docFileType: string = docObj.fileType;

    let ALLOWED_FILE_TYPES: Set<string> = new Set([
      "image/png",
      "application/pdf",
      "image/bmp",
      "image/gif",
      "image/ief",
      "image/jpeg",
      "image/pipeg",
      "image/tiff",
      "image/svg+xml",
    ]);

    let error: CFError;
    // TODO:- throw CFError from frontend error restructure task
    if (!ALLOWED_FILE_TYPES.has(docFileType)) {
      error = new CFError(
        "incorrectFileUploadType",
        "Frontend validation error",
        undefined,
        undefined,
        "debug",
        true
      );
      return throwError(error);
    }

    if (docObj.doc.size > fileLimit) {
      error = new CFError(
        "maxFileSizeLimit",
        "Frontend validation error",
        undefined,
        undefined,
        "debug",
        true
      );
      return throwError(error);
    }
  }

  /**
   * Removes a document from the database for a user.
   * @param doc An uploaded document model
   */
  removeDoc(doc: Document): Observable<UploadPageModel> {
    let options = new TokenServiceRequestOptions({
      url: "documents",
      data: doc,
    });

    let result = this.postInject(
      this.delete(options),
      (res: DocumentsAPIArgs) => {
        return new UploadPageModel(res);
      }
    );
    return result;
  }

  /**
   * Marks the passed array of addresses as valid or invalid
   * @param addressesStrings The addresses to be marked valid or invalid
   * @param areValid Whether the addresses should be marked as valid
   */
  verifyAddress(addressesStrings: string[], areValid: boolean) {
    let addresses: any = {};
    let addressesDict = {};
    addressesStrings.forEach((address) => {
      addressesDict[address] = areValid;
    });
    addresses.addresses = addressesDict;

    let options = new TokenServiceRequestOptions({
      url: "documents/address/verify",
      data: addresses,
    });

    let result = this.postInject(this.post(options), (res) => {
      return res;
    });
    return result;
  }
}
