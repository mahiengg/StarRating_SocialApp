import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { StarRatingsPageComponent } from "./star-ratings-page.component";

import { AverageRatingComponent } from "../components/average-rating/average-rating.component";
import { RatingComponent } from "../components/rating/rating.component";
import { RatingsListComponent } from "../components/ratings-list/ratings-list.component";
import data from "../data/testData.json";

describe("StarRatingsPageComponent", () => {
  let component: StarRatingsPageComponent;
  let fixture: ComponentFixture<StarRatingsPageComponent>;
  let compiledComponent: DebugElement;

  const getStars = () => compiledComponent.queryAll(By.css("span"));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StarRatingsPageComponent,
        AverageRatingComponent,
        RatingComponent,
        RatingsListComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingsPageComponent);
    component = fixture.componentInstance;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
  });

  it("StarRatingsPage Component should be created", () => {
    expect(component).toBeTruthy();
  });

  it("StarRatingsPage component has proper structure - should have five a total of 25 <span> tags for stars on entire page", () => {
    const stars = getStars();
    expect(stars.length).toBe(25);
  });

  it("StarRatingsPage component has proper structure - should have 3 <h4> tag for names and the names be in proper order", () => {
    const names = compiledComponent.queryAll(By.css("h4"));
    expect(names.length).toBe(3);
    expect(names[0].nativeElement.textContent).toBe(data[0].name);
    expect(names[1].nativeElement.textContent).toBe(data[0].name);
    expect(names[2].nativeElement.textContent).toBe(data[1].name);
  });

  it("StarRatingsPage component has proper structure - should have <p> tag for content of each rating component rendered", () => {
    const content = compiledComponent.queryAll(By.css("p"));
    expect(content.length).toBe(3);
  });
});
