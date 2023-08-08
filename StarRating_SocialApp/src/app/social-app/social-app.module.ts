import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { FriendsData } from "./data/friends-data";

import { SocialAppPageComponent } from "./pages/social-app-page.component";
import { FriendListComponent } from "./components/friend-list/friend-list.component";

import { SocialAppService } from "./social-app.service";

const socialAppRoutes: Routes = [
  { path: "", component: SocialAppPageComponent },
];

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FriendsData, {
      delay: 1000,
      dataEncapsulation: false,
    }),
    RouterModule.forChild(socialAppRoutes),
    CommonModule,
  ],
  declarations: [SocialAppPageComponent, FriendListComponent],
  providers: [
    { provide: "simulateLoadError", useValue: false },
    { provide: "simulateUpdateError", useValue: false },
    SocialAppService,
  ],
})
export class SocialAppsModule {}
