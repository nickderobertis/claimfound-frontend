import { Injectable, EventEmitter } from '@angular/core';
import { BaseService, ServiceRequestOptions } from 'src/app/global/base.service';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from 'src/app/global/logger.service';
import { StorageService } from 'src/app/global/storage.service';
import { Router } from '@angular/router';
import { ErrorModalService } from 'src/app/error-modal/errormodal.service';
import { UserNameAndEmailArgs } from 'src/app/global/api/interfaces/endpoints/userinfo/user-info.interface';

const oneday = 60 * 60 * 24 * 1000;

@Injectable()
export class LandingModalService extends BaseService {
  openLandingModal: EventEmitter<string> = new EventEmitter();

  hasShownLandingModalStorageKey: string = "cf-last-shown-landing-modal";

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  showLandingModal(): void {
    if (this.AtLeastOneDayHasPassedSinceLastPopup()) {
      this.openLandingModal.emit();
      let currentDate = Date.now();
      this.storage.write(this.hasShownLandingModalStorageKey, currentDate);
    }
  }

  AtLeastOneDayHasPassedSinceLastPopup(): boolean {
    let lastPopupTime = this.storage.read<number>(this.hasShownLandingModalStorageKey);
    return ((Date.now() - lastPopupTime) > oneday);
  }

  sendUserEmailRegister(args: UserNameAndEmailArgs) {

    let options = new ServiceRequestOptions({
      url: "monitoring",
      data: args,
    });
    return this.post(options);
  }
}
