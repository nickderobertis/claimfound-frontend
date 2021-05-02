import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ProfileNamesBodyComponent } from "./body/personalinfo/names/profilenamesbody.component";
import { ProfileBirthdayGenderBodyComponent } from "./body/personalinfo/birthdaygender/profilebirthdaygenderbody.component";
import { ProfileRelativesBodyComponent } from "./body/family/relatives/profilerelativesbody.component";
import { ProfilePhonesBodyComponent } from "./body/phones/phones/profilephonesbody.component";
import { ProfileAddressBodyComponent } from "./body/addresses/addresses/profileaddressbody.component";
import { ProfileRelativesQuestionsComponent } from "./body/family/questions/profilerelativesquestions.component";
import { ProfilePhonesQuestionsComponent } from "./body/phones/questions/profilephonesquestions.component";
import { ProfileAddressesQuestionsComponent } from "./body/addresses/questions/profileaddressesquestions.component";
import {
  profileRootPath,
  ProfilePageConstants,
  ProfilePagePaths,
} from "./profilepageconstants";

let paths: ProfilePagePaths = ProfilePageConstants.pageRelativePaths;

const ProfileRoutes = [
  {
    path: profileRootPath,
    component: ProfileComponent,
    children: [
      { path: "", redirectTo: paths.names, pathMatch: "full" },
      { path: paths.names, component: ProfileNamesBodyComponent },
      {
        path: paths.birthdayGender,
        component: ProfileBirthdayGenderBodyComponent,
      },
      { path: paths.relatives, component: ProfileRelativesBodyComponent },
      {
        path: paths.relativesQuestions,
        component: ProfileRelativesQuestionsComponent,
      },
      { path: paths.phones, component: ProfilePhonesBodyComponent },
      {
        path: paths.phonesQuestions,
        component: ProfilePhonesQuestionsComponent,
      },
      { path: paths.addresses, component: ProfileAddressBodyComponent },
      {
        path: paths.addressesQuestions,
        component: ProfileAddressesQuestionsComponent,
      },
    ],
  },
];

export const profileRouting = RouterModule.forChild(ProfileRoutes);
