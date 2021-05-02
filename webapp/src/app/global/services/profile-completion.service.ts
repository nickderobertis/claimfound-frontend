import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { BaseService, TokenServiceRequestOptions } from "../base.service";
import { LoggerService } from "../logger.service";
import { StorageService } from "../storage.service";
import { ErrorModalService } from "src/app/error-modal/errormodal.service";
import { UserDetailsStatusAPIArgs } from "../api/interfaces/endpoints/user-details/user-details-status.interface";
import { UserDetailsStatusModel } from "../api/models/userdetails/user-details-status.model";

/**
 * The service that determines whether the user has completed the profile pages, and enables
 * the [ProfileCompletionModalComponent]{@link ProfileCompletionModalComponent} if the user has
 * not completed them.
 */
@Injectable()
export class ProfileCompletionService extends BaseService {
  showProfileIncomplete: EventEmitter<boolean> = new EventEmitter();

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  pushShowIncompleteEvent(): void {
    this.showProfileIncomplete.emit(true);
  }

  getStatus(): Observable<UserDetailsStatusModel> {
    let options = new TokenServiceRequestOptions({
      url: "user/status",
    });

    return this.postInject(
      this.get(options),
      (res: UserDetailsStatusAPIArgs) => {
        return new UserDetailsStatusModel(res);
      }
    );
  }

  getStatusPushEvents(): void {
    this.getStatus().subscribe((res: UserDetailsStatusModel) => {
      if (!res.canUploadDocs) {
        this.pushShowIncompleteEvent();
      }
    });
  }
}
