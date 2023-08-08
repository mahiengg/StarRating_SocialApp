import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AverageRatingComponent } from "./components/average-rating/average-rating.component";
import { RatingComponent } from "./components/rating/rating.component";
import { RatingsListComponent } from "./components/ratings-list/ratings-list.component";
import { StarRatingsPageComponent } from "./pages/star-ratings-page.component";

const starRatingsRoutes: Routes = [
  { path: "", component: StarRatingsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(starRatingsRoutes), CommonModule],
  declarations: [
    StarRatingsPageComponent,
    AverageRatingComponent,
    RatingComponent,
    RatingsListComponent,
  ],
})
export class StarRatingsModule {}
