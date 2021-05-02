import { Routes, RouterModule } from "@angular/router";
import { ClaimsBarDashboardComponent } from "./subdashboard/claimsbardashboard.component";
import { MyClaimsComponent } from "../myclaims/view/myclaims.component";
import { UploadComponent } from "../claim/upload/upload.component";
import { PaymentComponent } from "../claim/payment/payment.component";
import { FormsPageComponent } from "../claim/esign/formspage.component";

const ClaimsBarRoutes: Routes = [
  {
    path: "dashboard",
    component: ClaimsBarDashboardComponent,
    children: [
      { path: "", redirectTo: "myclaims", pathMatch: "full" },
      { path: "myclaims", component: MyClaimsComponent },
      { path: "claim/documents", component: UploadComponent },
      { path: "claim/forms", component: FormsPageComponent },
      { path: "claim/review", component: PaymentComponent },
    ],
  },
];

export const claimsbarRouting = RouterModule.forChild(ClaimsBarRoutes);
