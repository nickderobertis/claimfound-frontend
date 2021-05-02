import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";

import { ReferralBarComponent } from "./referralBar/referralBar.component";
import { ReferralService } from "./referral.service";
import { ReferralEmailComponent } from './referralEmailModal/referralemailmodal.component';
import { GlobalComponentsModule } from '../global/components/globalcomponents.module';

/**
 * Currently just has the [ReferralBarComponent]{@link ReferralBarComponent}
 * which is used on both property search and family claims.
 *
 * Allows referring a user by email, Facebook, or copying a link.
 */
@NgModule({
  imports: [CommonModule, FormsModule, GlobalComponentsModule],
  declarations: [ReferralBarComponent, ReferralEmailComponent],
  exports: [ReferralBarComponent, ReferralEmailComponent],
  providers: [ReferralService],
})
export class ReferralModule {}
