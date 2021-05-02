/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Routes, RouterModule } from "@angular/router";

import { _404Component } from "./global/404/404.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "404", component: _404Component },
  { path: "**", redirectTo: "404", pathMatch: "full" },
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
