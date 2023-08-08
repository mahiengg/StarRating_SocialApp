import { Component, Input, SimpleChange } from "@angular/core";

@Component({
  selector: "app-ratings-list",
  templateUrl: "./ratings-list.component.html",
  styleUrls: ["./ratings-list.component.css"],
})
export class RatingsListComponent {
  ratings: any;
  users: any;

  @Input() allUserData: any;
  fiveStarRating: number[] = new Array(5);
  sum: any = 0;

  ngOnInit() {
    if (this.allUserData) {
      this.ratings = this.allUserData;
    }
    this.ratings.forEach((user: any) => {
      this.sum = this.sum + user.rate;
    });
    this.users = this.sum / this.ratings.length;
    this.users = Math.ceil(this.users);
  }
}
