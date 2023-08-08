import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { AverageRatingComponent } from "./average-rating.component";
import data from "../../data/testData.json";

const TEST_DATA_ALTERNATE = [
  {
    name: "Keisha Holmes",
    content: "Lorem ipsum",
    rate: 5,
  },
  {
    name: "Allison Ratliff",
    content: "Lorem ipsum",
    rate: 4,
  },
  {
    name: "John Smith",
    content: "Lorem ipsum",
    rate: 1,
  },
];

describe("AverageRatingComponent", () => {
  let component: AverageRatingComponent;
  let fixture: ComponentFixture<AverageRatingComponent>;
  let compiledComponent: DebugElement;

  const getStars = () => compiledComponent.queryAll(By.css("span"));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageRatingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageRatingComponent);
    component = fixture.componentInstance;
    component.ratings = data;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
  });

  it("AverageRating component should be created", () => {
    expect(component).toBeTruthy();
  });

  it("AverageRating component has proper structure - component should have .ratings__average className", () => {
    const mainComponent = fixture.debugElement.nativeElement;
    
    expect(mainComponent.className).toContain("ratings__average");
  });

  it("AverageRating component has proper structure - should have five <span> tags for 5 stars", () => {
    const stars = getStars();
    expect(stars.length).toBe(5);
  });

  it("AverageRating component has working logic - if average rate is 2.25 ((5+1+1+2)/4), three stars should be filled (&#9733;), and two should be empty (&#9734;))", () => {
    const stars = getStars();
    expect(stars[0].nativeElement.textContent).toBe("★");
    expect(stars[1].nativeElement.textContent).toBe("★");
    expect(stars[2].nativeElement.textContent).toBe("★");
    expect(stars[3].nativeElement.textContent).toBe("☆");
    expect(stars[4].nativeElement.textContent).toBe("☆");
  });

  it("AverageRating component has working logic - if average rate is 3.33 ((5+4+1)/2), four stars should be filled (&#9733;), and one should be empty (&#9734;)", () => {
    fixture = TestBed.createComponent(AverageRatingComponent);
    component = fixture.componentInstance;
    component.ratings = TEST_DATA_ALTERNATE;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
    const stars = getStars();
  
  
  
    expect(stars[0].nativeElement.textContent).toBe("★");
    expect(stars[1].nativeElement.textContent).toBe("★");
    expect(stars[2].nativeElement.textContent).toBe("★");
    expect(stars[3].nativeElement.textContent).toBe("★");
    expect(stars[4].nativeElement.textContent).toBe("☆");
  });
});
