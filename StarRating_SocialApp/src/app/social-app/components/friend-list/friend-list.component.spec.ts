import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FriendListComponent } from "./friend-list.component";
import data from "../../data/data.json";

describe("FriendListComponent", () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;
  let compiledComponent: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    component.friends = data;
    compiledComponent = fixture.debugElement;
    fixture.detectChanges();
  });

  it("FriendList Component should be created", () => {
    expect(component).toBeTruthy();
  });

  it("FriendList component correctly renders My Friends header", () => {
    const header = compiledComponent.query(By.css("h3"))?.nativeElement;
    expect(header?.textContent).toBe("My Friends");
  });

  it("FriendList component has proper structure - should have an <li> tag for each friend rendered with a <span> for the name and a <button> for the like action", () => {
    const liTags = compiledComponent.queryAll(By.css("li"));
    const spanTags = compiledComponent.queryAll(By.css("span"));
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    expect(liTags.length).toBe(5);
    expect(spanTags.length).toBe(5);
    expect(buttonTags.length).toBe(5);
  });

  it("FriendList component has proper structure - the friends name should be wrapped in a <h3> tag", () => {
    const spanTags = compiledComponent.queryAll(By.css("span"));
    expect(spanTags[0].nativeElement.textContent).toBe(data[0].name);
    expect(spanTags[2].nativeElement.textContent).toBe(data[2].name);
  });

  it("FriendList component all buttons have correct like count", () => {
    const buttonTags = compiledComponent.queryAll(By.css("button"));
    expect(buttonTags[0].nativeElement.textContent.trim()).toBe(
      `Like ${data[0].likeCount}`
    );
    expect(buttonTags[1].nativeElement.textContent.trim()).toBe(
      `Like ${data[1].likeCount}`
    );
    expect(buttonTags[2].nativeElement.textContent.trim()).toBe(
      `Like ${data[2].likeCount}`
    );
    expect(buttonTags[3].nativeElement.textContent.trim()).toBe(
      `Like ${data[3].likeCount}`
    );
    expect(buttonTags[4].nativeElement.textContent.trim()).toBe(
      `Like ${data[4].likeCount}`
    );
  });
});
