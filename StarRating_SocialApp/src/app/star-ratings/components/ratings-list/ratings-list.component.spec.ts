import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { RatingsListComponent } from "./ratings-list.component";
import data from "../../data/testData.json";

import { AverageRatingComponent } from "../average-rating/average-rating.component";
import { RatingComponent } from "../rating/rating.component";

describe("RatingsListComponent", () => {
  let component: RatingsListComponent;
  let fixture: ComponentFixture<RatingsListComponent>;
  let compiledComponent: DebugElement;

  const getStars = () => compiledComponent.queryAll(By.css("span"));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RatingsListComponent,
        AverageRatingComponent,
        RatingComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsListComponent);
    component = fixture.componentInstance;
    component.ratings = data;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
  });

  it("RatingsList component should be created", () => {
    expect(component).toBeTruthy();
  });

  it("RatingsList component has proper structure - should have five a total of 15 <span> tags (5 for the average and 10 for the 2 different ratings)", () => {
    const stars = getStars();
    expect(stars.length).toBe(15);
  });

  it("RatingsList component has proper structure - should have 2 <h4> tags for names and the names be in proper order", () => {
    const names = compiledComponent.queryAll(By.css("h4"));
    expect(names.length).toBe(2);
    expect(names[0].nativeElement.textContent).toBe(data[0].name);
    expect(names[1].nativeElement.textContent).toBe(data[1].name);
  });
});
