/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoggerService } from "../../logger.service";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HelpModalComponent } from "./header/helpmodal.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent, FooterComponent, HelpModalComponent],
  exports: [HeaderComponent, FooterComponent, HelpModalComponent],
  providers: [LoggerService],
})
export class HeaderFooterModule {}
