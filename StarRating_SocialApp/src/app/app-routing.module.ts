import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShellComponent } from "./shell/shell.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      { path: "home", component: HomeComponent },
      {
        path: "star-ratings",
        loadChildren: () =>
          import("./star-ratings/star-ratings.module").then(
            (m) => m.StarRatingsModule
          ),
      },
      {
        path: "social-app",
        loadChildren: () =>
          import("./social-app/social-app.module").then(
            (m) => m.SocialAppsModule
          ),
      },
      { path: "", redirectTo: "home", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
