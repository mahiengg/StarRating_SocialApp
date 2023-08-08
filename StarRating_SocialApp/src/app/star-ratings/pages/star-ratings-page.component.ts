import { OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Component } from "@angular/core";
import data from "../data/testData.json";

@Component({
  selector: "app-star-ratings-page",
  templateUrl: "./star-ratings-page.component.html",
})
export class StarRatingsPageComponent {
  // The json data is imported and stored in ratings variable
  // pass ratings to the rating_component by the concept called sharing data from parent to children.

  public userRating = data[0];
  public allUserData = data;
}
