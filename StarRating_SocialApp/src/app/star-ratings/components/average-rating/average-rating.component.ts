import { Component, EventEmitter, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-average-rating",
  templateUrl: "./average-rating.component.html",
  styleUrls: ["./average-rating.component.css"],
  host: {
    class: "ratings__average",
  },
})
export class AverageRatingComponent implements OnInit {
  ratings: any;

  @Input() allUserData: any;
  average: any;
  fiveStarRating: number[] = new Array(5);
  sum: any = 0;

  ngOnInit() {
    if (this.allUserData) {
      this.ratings = this.allUserData;
    }
    this.ratings.forEach((user: any) => {
      this.sum = this.sum + user.rate;
    });
    this.average = this.sum / this.ratings.length;
    this.average = Math.ceil(this.average);
  }
}
