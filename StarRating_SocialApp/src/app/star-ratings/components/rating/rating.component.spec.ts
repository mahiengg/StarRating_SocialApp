import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { RatingComponent } from "./rating.component";
import data from "../../data/testData.json";


describe("RatingComponent", () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let compiledComponent: DebugElement;

  const getStars = () => compiledComponent.queryAll(By.css("span"));

  beforeEach(async () => {
       await TestBed.configureTestingModule({
      declarations: [RatingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    component.name = data[0].name;
    component.content = data[0].content;
    component.rate = data[0].rate;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
  });

  it("Rating component should be created", () => {
    expect(component).toBeTruthy();
  });

  it("Rating component has proper structure - component should have .ratings__item className", () => {
    const mainComponent = fixture.nativeElement;
    expect(mainComponent.className).toContain("ratings__item");
  });

  it("Rating component has proper structure - should have five <span> tags for 5 stars", () => {
    const stars = getStars();
    expect(stars.length).toBe(5);
  });

  it("Rating component has proper structure - should have <h4> tag for name", () => {
    const name = compiledComponent.query(By.css("h4"))?.nativeElement;
    expect(name?.textContent).toBe(data[0].name);
  });

  it("Rating component has proper structure - should have <p> tag for content", () => {
    const content = compiledComponent.query(By.css("p"))?.nativeElement;
    expect(content?.textContent).toBe(data[0].content);
  });

  it("Rating component has working logic - if rating is 4, four stars should be filled (&#9733;) and one should be empty (&#9734;)", () => {
    const stars = getStars();
    expect(stars[0].nativeElement.textContent).toBe("★");
    expect(stars[1].nativeElement.textContent).toBe("★");
    expect(stars[2].nativeElement.textContent).toBe("★");
    expect(stars[3].nativeElement.textContent).toBe("★");
    expect(stars[4].nativeElement.textContent).toBe("☆");
  });
});
