import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import { LoggerService, log } from "../../../global/logger.service";

/**
 * The component which displays the total value of all the claims on the
 * Final Review page.
 */
@Component({
  selector: "cf-payment-checkout",
  templateUrl: "./paymentcheckout.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./paymentcheckout.component.scss",
  ],
})
export class PaymentCheckoutComponent {
  @Input() totalAmount: number = 0;
  @Input() userFees: number = 0;

  constructor(private logger: LoggerService) {}
}
