import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
  host: {
    class: "ratings__item",
  },
})
export class RatingComponent implements OnInit {
  name: any;
  content: any;
  rate: any;

  fiveStarRating: number[] = new Array(5);

  //@Input() lets a parent component update data in the child component
  @Input() userRating: any;
  ngOnInit() {
    if (this.userRating) {
      this.name =  this.userRating?.name;
      this.rate =  this.userRating?.rate ;
      this.content =  this.userRating?.content;
    }
  }
}
